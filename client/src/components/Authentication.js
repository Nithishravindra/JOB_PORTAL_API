import decode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  constructor(domain) {
    this.domain = "http://localhost:3000/api/v1/users";
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  async login(email, password) {
    // Get a token
    console.log(password);

    const data = {
      email,
      password,
    };

    let r = await axios
      .post("http://localhost:3000/api/v1/users/login", data)
      .then(function (response) {
        console.log("In item");
        console.log(response);
        localStorage.setItem("token", response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });

    return r;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }

  getProfile() {
    console.log("Get profile");
    console.log(this.getToken());
    console.log(decode(this.getToken()));
    return decode(this.getToken());
  }
}
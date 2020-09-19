# JOB_PORTAL API

An application developed using NodeJS, Express with MongoDB that provides a set of API calls to do necessary operations between Users and Employers.

### Development

- API is built using Node/Express.
- MongoDB is used as a database and has 'users', 'jobs' and 'applications' collection.
- Authentication is handled using JWT.

### Usecase

- users collection can have 2 types of role. _ Employer(job-recruiter) _ User (job-seeker)
- User or Employer can register with necessary sign-up details.
- Both can login with same credentials.
- JWT is used to manage user authentication.
- Job posting is restricted only user of type employer.
- Can apply to Job by providing application, this action is restricted to user of type user.

### Endpoints

#### Users

- Registering a new user

```
Route: /api/v1/users/signup
Method: POST
Body: {
  name: 'john doe',
  email: 'johndoe@gmail.com'
  password: '********',
  passwordConfirm: '********'
  role: [ user || employer]
}
```

- Login

```
Route: /api/v1/users/login
Method: POST
Body: {
  email: 'johndoe@gmail.com',
  password: '********'
}
```

- Get All Users (Employers, Users)

```
Route: /api/v1/users
Method: GET
```

- Get User

```
Route: /api/v1/users/:userID
Method: GET
```

- Reset Password

```
Route: /api/v1/users/resetPassword
Method: POST
Body: {
  email: "johndoe@gmail.com",
  password: "********",
  passwordConfim: "********"
}
```

- Update User

```
Route: /ap1/v1/users/:userID
Method: PATCH

```

- Get All Employers(role = Employers)

```
Route: /api/v1/users/getOnlyEmployers
Method: GET
```

- Get All User (role = User)

```
Route: /api/v1/users/getOnlyUsers
Method: GET
```

- Delete User

```
Route: /api/v1/users/:userID
Method: DEL
```

#### Jobs

- Get All Jobs

```
Route: /api/v1/jobs
Method: GET
```

- Get a Job
  - gives information on job and applicantions detail.

```
Route: /api/v1/jobs/:jobID
Method: GET
```

- Add a Job
  - Endpoint restricted to Employers.

```
Route: /api/v1/jobs/postJob/:empID
Method: POST
Body: {
  role: "XXXXX",
  duration: "X years",
  companySize: XXX,
  salary: XXXXXX
}
```

- Delete a Job

```
Route: /api/v1/jobs/:jobID
Method: DEL
```

#### Applications

- Get All Applications

```
Route: /api/v1/applications
Method: GET
```

```
Route: /api/v1/applications/:jobID
Method: GET
```

- Add Applications
  - Endpoint restricted to Users(role = users).

```
Route: /api/v1/applications/addApplications/:userID/:jobID
Method: POST
Body: {
  description: "Hire me!!!"
}
```

- Delete a Job

```
Route: /api/v1/jobs/:jobID
Method: DEL
```

### LICENSE

MIT © [Nithish](https://nithishravindra.com)

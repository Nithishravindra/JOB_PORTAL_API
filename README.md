# JOB_PORTAL API

An application developed using NodeJS, Express with MongoDB that provides a set of API calls to do necessary operations between Users and Employers.

### Development

- API is built using Node/Express.
- MongoDB is used as a database and has 'users', 'jobs' and 'applications' collection.
- Authentication is handled using JWT.

### Usecase

- users collection can have 2 types of role. _) Employer(job-recruiter) _) User (job-seeker)
- User or Employer can register with necessary sign-up details.
- Both Can login with same credentials.
- JWT is used to manage user authentication.
- Job posting is restricted only user of type employer.
- Can apply to Job by providing application, this action is restricted to user of type user.

### LICENSE

MIT © [Nithish](https://nithishravindra.com)

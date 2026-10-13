
# Auth Service API

A REST API for user registration, login, JWT authentication, and role-based authorization, built using Node.js, Express, TypeScript, and MongoDB.

## Features

- User registration with input validation
- Password hashing using bcrypt
- Login with email and password
- JWT access tokens with 15-minute expiry
- Protected user profile endpoint
- Role-based authorization for admin-only routes
- MongoDB database integration
- Environment variables for configuration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Manish12-king/auth-service-api.git
cd auth-service-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own credentials. Never commit your `.env` file.

### 4. Start the development server

```bash
npm run dev
```

The server runs on `http://localhost:5000`, assuming port 5000 is configured.

## API Endpoints

Base URL: `http://localhost:5000/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Log in and receive an access token | Public |
| GET | `/Profile` | Fetch the logged-in user's profile | Authenticated |
| GET | `/admin` | Access the admin-only route | Admin only |

### Register a user

`POST /api/auth/register`

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPass123!"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "test@example.com",
  "password": "TestPass123!"
}
```

A successful login returns an access token. Use that token in the `Authorization` header for protected routes:

```text
Authorization: Bearer <your_access_token>
```

### Get profile

`GET /api/auth/Profile`

Requires a valid access token.

### Admin-only route

`GET /api/auth/admin`

Requires a valid access token and an account with the `admin` role. Normal users receive a `403 Forbidden` response.

## Security Notes

- Passwords are stored as bcrypt hashes.
- New registrations receive the default `user` role.
- Admin access is checked against the user's role in the database.
- Keep `.env` and all secrets private.
- Use a trusted administrative process to grant admin privileges.

## Future Improvements

- Refresh tokens and logout
- Token revocation
- Automated tests
- API documentation with Swagger
- Rate limiting and additional security hardening

## Author

Manish Sharma

GitHub: [Manish12-king](https://github.com/Manish12-king)

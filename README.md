# Event Scheduling System - Backend (Phase 0)

## Overview
This is the backend API for the Event Scheduling System, implementing Phase 0 requirements which include User Management (Sign up and Login).

## Features Implemented
- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Input Validation
- Error Handling

## Technology Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM (@prisma/client, prisma)
- JWT for authentication
- bcryptjs for password hashing

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.development.local` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
SERVER_URL=http://localhost:3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/event_scheduling_system

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start PostgreSQL
Make sure PostgreSQL is running on your system. You can use:
- Local PostgreSQL installation
- PostgreSQL cloud service (like AWS RDS, Heroku Postgres)
- Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`

### 4. Initialize Prisma and Database
```bash
# Generate Prisma client
"C:\\Program Files\\nodejs\\npm.cmd" run prisma:generate

# Create DB schema via Prisma Migrate (will create users table if missing)
"C:\\Program Files\\nodejs\\npm.cmd" run prisma:migrate -- --name init

# Optional: open Prisma Studio (GUI)
"C:\\Program Files\\nodejs\\npm.cmd" run prisma:studio
```

### 5. Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Get User Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

#### Logout User
- **POST** `/api/auth/logout`
- **Headers:** `Authorization: Bearer <token>`

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // Optional
}
```

## Testing the API

You can test the API using:
- Postman
- curl
- Any HTTP client

### Example curl commands:

#### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Get profile (with token):
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure
```
Event-Scheduling-System/
├── config/
│   └── env.js                 # Environment configuration
├── controllers/
│   └── authController.js      # Authentication controllers
├── Database/
│   ├── connection.js          # Database connection
│   └── init.sql              # SQL schema (for reference)
├── Middlewares/
│   └── auth.js               # Authentication middleware
├── models/
│   └── User.js               # User model
├── routes/
│   └── authRoutes.js         # Authentication routes
├── utils/                    # Utility functions
├── app.js                    # Main application file
├── package.json              # Dependencies
└── README.md                 # This file
```

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Input validation
- Error handling without sensitive information exposure
- CORS ready (can be configured)

## Next Steps (Phase 1)
- Event Management
- Invitation System
- Response Management
- Search and Filtering

import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Mock user data for testing
const mockUsers = [
  {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123' // In real app, this would be hashed
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Event Scheduling System API! (Test Mode)',
    version: '1.0.0',
    note: 'This is a test server without database connection',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        logout: 'POST /api/auth/logout'
      }
    }
  });
});

// Mock Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Check if user exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create new user (mock)
  const newUser = {
    id: mockUsers.length + 1,
    email,
    firstName,
    lastName,
    password
  };
  
  mockUsers.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User registered successfully (Test Mode)',
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      token: 'mock-jwt-token-' + newUser.id
    }
  });
});

// Mock Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful (Test Mode)',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token: 'mock-jwt-token-' + user.id
    }
  });
});

// Mock Profile endpoint
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization;
  
  if (!token || !token.includes('mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  // Extract user ID from mock token
  const userId = parseInt(token.split('-').pop());
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully (Test Mode)',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }
  });
});

// Mock Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful (Test Mode)'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test Server is running on http://localhost:${PORT}`);
  console.log(`📝 This is a test version without database connection`);
  console.log(`🔗 Try: http://localhost:${PORT}/api/auth/register`);
});

export default app;

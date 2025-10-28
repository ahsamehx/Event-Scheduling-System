import express from 'express';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import { authenticateToken } from '../Middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

export default router;

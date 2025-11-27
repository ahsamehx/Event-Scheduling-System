import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password) are required",
        });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Check if user already exists
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists",
        });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.createUser({
        name,
        email,
        password: hashedPassword,
        role,
        });

        const token = jwt.sign(
        { userId: newUser.userId, role: newUser.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
        );

        return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
            token,
            userId: newUser.userId,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res) => {
    try {
        const{ email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const user = await User.findUserByEmail(email);
        if(!user) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});

        res.status(200).json({ 
            success : true, 
            message: 'User signed in successfully', 
            data : {
                token,
                name: user.name,
                email: user.email, 
                role : user.role,
                userId: user.userId
            }
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || "Server Error" });
    }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
    
    });

    return res.status(200).json({ success: true, message: "Signed out successfully." });
  } catch (error) {
    next(error);
  }
};


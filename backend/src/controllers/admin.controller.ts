import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

const JWT_SECRET: string = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '7d';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    // @ts-ignore - jsonwebtoken types issue with expiresIn
    const token = jwt.sign(
      { adminId: admin._id.toString() },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email
        }
      }
    });
  } catch (error: any) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Token is valid'
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

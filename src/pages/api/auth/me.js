import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'think-india-secure-jwt-secret-key-2024';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Try to get token from cookie first
    const cookie = req.headers.cookie || '';
    console.log('Cookies received:', cookie);
    
    const match = cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      console.log('No token found in cookies');
      return res.status(401).json({ message: 'No token found' });
    }

    console.log('Token found, attempting to verify...');

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Token verified, user ID:', decoded.userId);

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        console.log('User not found for token:', decoded.userId);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User found:', user.email);
      res.status(200).json(user);
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.message);
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token format' });
      }
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      throw jwtError;
    }
  } catch (error) {
    console.error('Error in /api/auth/me:', error.message);
    res.status(401).json({ message: 'Authentication failed' });
  }
} 
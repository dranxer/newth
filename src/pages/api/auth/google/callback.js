import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'think-india-secure-jwt-secret-key-2024';

// Validate required environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
};

// Check if any required environment variables are missing
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if all required environment variables are set
  if (missingEnvVars.length > 0) {
    console.error('Google OAuth configuration is incomplete');
    return res.redirect(307, '/login?error=oauth_config');
  }

  console.log('Callback received:', req.query);
  const { code } = req.query;
  
  if (!code) {
    console.error('No code provided in callback');
    return res.redirect(307, '/login?error=no_code');
  }

  try {
    console.log('Exchanging code for tokens...');
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', { 
      access_token: tokens.access_token ? 'present' : 'missing',
      refresh_token: tokens.refresh_token ? 'present' : 'missing',
      expiry_date: tokens.expiry_date
    });
    oauth2Client.setCredentials(tokens);

    console.log('Fetching user info...');
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    console.log('User info received:', {
      email: data.email,
      name: data.name,
      id: data.id
    });

    if (!data.email) {
      console.error('No email received from Google');
      return res.redirect(307, '/login?error=no_email');
    }

    console.log('Checking for existing user...');
    let user = await prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user) {
      console.log('Creating new user...');
      user = await prisma.user.create({
        data: {
          name: data.name || data.email.split('@')[0],
          email: data.email,
          password: '', // Empty password for OAuth users
        },
      });
      console.log('New user created:', {
        id: user.id,
        email: user.email,
        name: user.name
      });
    } else {
      console.log('Existing user found:', {
        id: user.id,
        email: user.email,
        name: user.name
      });
    }

    console.log('Generating JWT token...');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const cookieOptions = [
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=604800'
    ];

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.push('Secure');
    }

    console.log('Setting cookies with options:', cookieOptions);
    res.setHeader('Set-Cookie', [
      `token=${token}; ${cookieOptions.join('; ')}`,
      `user=${JSON.stringify({ id: user.id, name: user.name, email: user.email })}; ${cookieOptions.join('; ')}`
    ]);

    // Redirect to home page with success message
    console.log('Redirecting to home page...');
    return res.redirect(307, '/?success=google_auth');
  } catch (error) {
    console.error('Google OAuth error:', error);
    console.error('Error stack:', error.stack);
    return res.redirect(307, '/login?error=auth_failed');
  }
} 
import { google } from 'googleapis';

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
    return res.status(500).json({ 
      message: 'Google OAuth is not properly configured. Please contact the administrator.',
      missingVars: missingEnvVars
    });
  }

  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      include_granted_scopes: true
    });

    console.log('Generated Google OAuth URL');
    res.redirect(307, authUrl);
  } catch (error) {
    console.error('Error generating Google OAuth URL:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Failed to initialize Google OAuth',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 
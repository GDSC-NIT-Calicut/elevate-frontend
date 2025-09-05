# Authentication Setup Guide for Elevate

This guide will help you set up the complete authentication system for the Elevate application.

## Overview

The authentication system uses:
- **NextAuth.js** for Google OAuth
- **Django Backend** for user management and JWT tokens
- **NITC Email Validation** for student access

## Prerequisites

1. Google Cloud Console access
2. Node.js and npm installed
3. Python and pip installed
4. Both frontend and backend repositories cloned

## Step 1: Google OAuth Setup

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

### 1.2 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add the following authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000/auth/callback/google` (if needed)
5. Copy the **Client ID** and **Client Secret**

## Step 2: Frontend Environment Variables

Create a `.env.local` file in the `elevate-frontend` directory:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-generated-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Backend URL
DJANGO_NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Generate NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# Or use a random string generator online
```

## Step 3: Backend Environment Variables

Create a `.env` file in the `elevate-backend/backend` directory:

```bash
CLIENT_ID=your-google-client-id-here
DATABASE_URL=your-database-url-here
```

## Step 4: Start the Services

### 4.1 Start Backend

```bash
cd elevate-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4.2 Start Frontend

```bash
cd elevate-frontend
npm install
npm run dev
```

## Step 5: Test Authentication

1. Open `http://localhost:3000/login`
2. Click "Sign in with Google"
3. Use your NITC email address
4. You should be redirected to the main page after successful authentication

## Authentication Flow

1. **User clicks "Sign in with Google"** → NextAuth.js handles Google OAuth
2. **NextAuth.js gets Google tokens** → Stores them in the session
3. **AuthProvider detects authenticated session** → Calls `/api/auth/verify-and-get-tokens`
4. **API route sends Google ID token to Django backend** → Backend verifies and creates/authenticates user
5. **Backend returns JWT tokens** → Frontend stores them for API calls
6. **User is authenticated** → Can access protected routes and make API calls

## Troubleshooting

### Common Issues

1. **"Environment Not Configured" Error**
   - Check that all environment variables are set correctly
   - Restart the development server after adding environment variables

2. **"Authentication failed" Error**
   - Verify Google OAuth credentials are correct
   - Check that the redirect URI matches exactly
   - Ensure the backend is running on the correct port

3. **"Invalid NITC email format" Error**
   - Only NITC email addresses (@nitc.ac.in) are allowed
   - The email format should be: `rollnumber_department@nitc.ac.in`

4. **CORS Errors**
   - Ensure the backend CORS settings include `http://localhost:3000`
   - Check that the backend is running and accessible

### Debug Steps

1. Check browser console for errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded correctly
4. Test the backend endpoint directly: `http://localhost:8000/api/user/google-oauth`

## Security Notes

- Never commit `.env` or `.env.local` files to version control
- Use strong, unique secrets for production
- Regularly rotate OAuth credentials
- Monitor authentication logs for suspicious activity

## Production Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URIs to Google OAuth
3. Use environment-specific database URLs
4. Set up proper SSL certificates
5. Configure production CORS settings

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the console logs for detailed error messages
3. Verify all environment variables are correctly set
4. Ensure both frontend and backend are running
5. Test with a valid NITC email address

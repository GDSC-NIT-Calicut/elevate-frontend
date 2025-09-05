# Google OAuth Authentication Setup

This guide will help you set up Google OAuth authentication for the Elevate frontend application.

## Quick Start

1. **Run the setup script**:
   ```bash
   node setup-env.js
   ```

2. **Configure Google Cloud Console**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials for a Web application
   - Add `http://localhost:3000` to authorized JavaScript origins

3. **Update environment variables**:
   - Edit `.env.local` and replace `your-google-client-id-here` with your actual Google Client ID

4. **Start the application**:
   ```bash
   npm run dev
   ```

5. **Test authentication**:
   - Visit `http://localhost:3000/test-auth`
   - Click "Sign in with Google"
   - Use your NITC email address

## Detailed Setup

### Step 1: Google Cloud Console Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Identity API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Identity" and enable it

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type
   - Add the following authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://your-production-domain.com` (for production)
   - Add the following authorized redirect URIs:
     - `http://localhost:3000`
     - `https://your-production-domain.com` (for production)
   - Copy the **Client ID**

### Step 2: Environment Variables

The setup script creates a `.env.local` file with the following variables:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Replace the placeholder values**:
- `your-google-client-id-here` with your actual Google Client ID
- Update `NEXT_PUBLIC_API_URL` if your backend is running on a different URL

### Step 3: Backend Configuration

Ensure your backend has the following environment variables:

```bash
# Backend .env file
CLIENT_ID=your-google-client-id-here
DATABASE_URL=your-database-url-here
```

**Important**: The `CLIENT_ID` in the backend must match the `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in the frontend.

## How It Works

### Authentication Flow

1. **User clicks "Sign in with Google"** → Google OAuth popup opens
2. **User authenticates with Google** → Google returns an ID token
3. **Frontend decodes token** → Extracts user information
4. **Frontend sends to backend** → POST to `/api/user/google-oauth` with:
   - `id_token`: Google's ID token
   - `email`: User's email
   - `name`: User's name
   - `roll_number`: Extracted from NITC email format
   - `department`: Extracted from NITC email format
   - `programme`: Extracted from NITC email format
5. **Backend verifies token** → Returns JWT tokens and user data
6. **Frontend stores tokens** → User is authenticated

### NITC Email Format

The system automatically extracts information from NITC email addresses:
- Format: `rollnumber_department@nitc.ac.in`
- Example: `b20cs001_cs@nitc.ac.in`
- Extracted data:
  - Roll number: `b20cs001`
  - Department: `Computer Science`
  - Programme: `BTech` (based on first letter: B=BTech, M=MTech, P=PhD)

## Testing

### Test Page

Visit `http://localhost:3000/test-auth` to test the authentication:
- Shows Google OAuth button
- Displays authentication status
- Shows user information when authenticated
- Displays environment variable status

### Debug Information

The implementation includes extensive logging:
- Check browser console for detailed logs
- Backend logs will show authentication attempts
- Environment variable status is displayed on the test page

## Troubleshooting

### Common Issues

1. **"Google OAuth components must be used within GoogleOAuthProvider"**
   - Make sure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
   - Restart the development server after adding environment variables

2. **"Invalid Credentials" Error**
   - Verify Google Client ID matches between frontend and backend
   - Check that the backend is running and accessible

3. **"Not found" Error**
   - Only NITC email addresses (@nitc.ac.in) are allowed
   - The email format should be: `rollnumber_department@nitc.ac.in`

4. **CORS Errors**
   - Ensure backend CORS settings include `http://localhost:3000`
   - Check that the backend is running on the correct port

5. **Environment Variables Not Loading**
   - Make sure `.env.local` is in the correct directory
   - Restart the development server after changes
   - Check the test page for environment variable status

### Debug Steps

1. **Check environment variables**:
   - Visit `http://localhost:3000/test-auth`
   - Look at the "Environment Variables" section

2. **Check browser console**:
   - Open Developer Tools (F12)
   - Look for authentication-related logs

3. **Check backend logs**:
   - Look for authentication attempts in backend console
   - Check for any error messages

4. **Test backend endpoint directly**:
   ```bash
   curl -X POST http://localhost:8000/api/user/google-oauth \
     -H "Content-Type: application/json" \
     -d '{"id_token":"test","email":"test@nitc.ac.in","name":"Test User"}'
   ```

## Production Deployment

For production deployment:

1. **Update Google Cloud Console**:
   - Add your production domain to authorized origins
   - Add your production domain to redirect URIs

2. **Update environment variables**:
   ```bash
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-client-id
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

3. **Backend configuration**:
   ```bash
   CLIENT_ID=your-production-client-id
   DATABASE_URL=your-production-database-url
   ```

4. **Security considerations**:
   - Use different OAuth credentials for development and production
   - Set up proper SSL certificates
   - Configure production CORS settings
   - Monitor authentication logs

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the console logs for detailed error messages
3. Verify all environment variables are correctly set
4. Ensure both frontend and backend are running
5. Test with a valid NITC email address
6. Check the test page at `http://localhost:3000/test-auth`

## Files

- `src/hooks/useGoogleAuth.tsx` - Main authentication hook
- `src/components/LoginButton.tsx` - Login button component
- `src/components/Providers.tsx` - Provider wrapper
- `src/app/test-auth/page.tsx` - Test page
- `setup-env.js` - Environment setup script
- `.env.local` - Environment variables (created by setup script)






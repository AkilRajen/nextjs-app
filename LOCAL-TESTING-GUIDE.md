# Local Testing Guide for AWS Amplify Cognito

## Prerequisites for Local Testing

You need to create AWS Cognito resources first, even for local testing, because social login requires real OAuth endpoints.

## Quick Setup for Local Testing

### 1. Create AWS Cognito User Pool (Required)

1. **Go to AWS Cognito Console**
2. **Create User Pool** with these settings:
   - Sign-in options: Email
   - Password policy: Default
   - MFA: Optional (disable for testing)
   - User account recovery: Email only
   - Self-registration: Enabled
   - Required attributes: Email

3. **Create App Client:**
   - App type: Public client
   - App client name: `nextjs-local-test`
   - Generate client secret: **NO** (important!)
   - Authentication flows: Allow all

4. **Configure Hosted UI:**
   - Domain: Create a custom domain or use Cognito domain
   - Callback URLs: `http://localhost:3000/`
   - Sign-out URLs: `http://localhost:3000/`
   - OAuth 2.0 grant types: Authorization code grant
   - OAuth 2.0 scopes: openid, email, profile

### 2. Set Up Social Providers (Choose One for Testing)

#### Option A: Google (Easiest for testing)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `https://YOUR_COGNITO_DOMAIN/oauth2/idpresponse`
4. In Cognito → Identity providers → Add Google:
   - Client ID: From Google Console
   - Client secret: From Google Console
   - Authorize scopes: `openid email profile`

#### Option B: Test Without Social Providers
You can test the basic setup without social providers by creating a test user directly in Cognito.

### 3. Configure Local Environment

Create `.env.local` file:
```b
ash
# Copy these values from your AWS Cognito User Pool
NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```

### 4. Start Local Development

```bash
npm run dev
```

### 5. Testing Scenarios

#### Test 1: Basic App Loading
- Visit `http://localhost:3000`
- Should see the auth buttons without errors
- Check browser console for any configuration errors

#### Test 2: Social Login Flow
- Click "Sign in with Google" (or your configured provider)
- Should redirect to Cognito hosted UI
- After successful login, should redirect back to localhost:3000
- Should show "Welcome, [username]!" message

#### Test 3: Sign Out
- Click "Sign Out" button
- Should clear user session and show login buttons again

## Troubleshooting Local Testing

### Common Issues:

1. **"Missing OAuth configuration" error**
   - Check that all environment variables are set in `.env.local`
   - Restart the dev server after adding env vars

2. **Redirect URI mismatch**
   - Ensure `http://localhost:3000/` is added to Cognito callback URLs
   - Check for trailing slashes - they matter!

3. **CORS errors**
   - Make sure your Cognito domain allows localhost origins
   - Check browser network tab for specific CORS errors

4. **Social provider not working**
   - Verify the provider is properly configured in Cognito
   - Check that the provider's redirect URI matches your Cognito domain

### Debug Steps:

1. **Check Environment Variables:**
```bash
# In your terminal, verify env vars are loaded
echo $NEXT_PUBLIC_USER_POOL_ID
```

2. **Check Browser Console:**
   - Look for Amplify configuration errors
   - Check network tab for failed requests

3. **Test Cognito Hosted UI Directly:**
   - Visit: `https://YOUR_DOMAIN.auth.region.amazoncognito.com/login?client_id=YOUR_CLIENT_ID&response_type=code&scope=openid+email+profile&redirect_uri=http://localhost:3000/`

## Alternative: Mock Testing

If you want to test the UI without setting up AWS resources, create a mock version:

```typescript
// src/components/AuthButton.mock.tsx
'use client';

import { useState } from 'react';

export default function AuthButtonMock() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="p-4 border rounded-lg">
      {isSignedIn ? (
        <div>
          <p className="mb-2">Welcome, Test User!</p>
          <button
            onClick={() => setIsSignedIn(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Sign In (Mock)</h3>
          <button
            onClick={() => setIsSignedIn(true)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Mock Sign In
          </button>
        </div>
      )}
    </div>
  );
}
```

Then temporarily replace the import in `page.tsx` for UI testing.
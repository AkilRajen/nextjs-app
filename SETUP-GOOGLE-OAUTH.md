# Setup Google OAuth for Cognito

## Why You Got 404 Error:
Google is not configured as an identity provider in your Cognito User Pool.

## Quick Test First:
I've updated your AuthButton to include an **"Sign in with Email"** button that works with basic Cognito authentication (no social setup required).

**Test this first:**
1. Deploy your updated code
2. Click "Sign in with Email" 
3. Should show Cognito hosted UI with email/password login
4. You can create an account with email/password

## To Add Google OAuth (Optional):

### Step 1: Create Google OAuth App
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** (or select existing)
3. **Enable Google+ API:**
   - APIs & Services → Library
   - Search "Google+ API" → Enable

4. **Create OAuth 2.0 Credentials:**
   - APIs & Services → Credentials
   - Create Credentials → OAuth 2.0 Client IDs
   - Application type: **Web application**
   - Name: `Cognito Social Login`

5. **Configure Authorized Redirect URIs:**
   - Add: `https://YOUR_COGNITO_DOMAIN/oauth2/idpresponse`
   - Example: `https://your-app-auth.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`

6. **Save and copy:**
   - Client ID
   - Client Secret

### Step 2: Add Google to Cognito
1. **AWS Cognito Console → Your User Pool**
2. **Left sidebar → Sign-in experience**
3. **Federated identity provider sign-in:**
   - Click "Add identity provider"
   - Select **Google**

4. **Configure Google Provider:**
   - Client ID: (from Google Console)
   - Client secret: (from Google Console)
   - Authorize scopes: `openid email profile`

5. **Save changes**

### Step 3: Update App Client
1. **Left sidebar → App clients**
2. **Click your app client**
3. **Hosted UI settings:**
   - Identity providers: Check **Google** ✅
   - OAuth 2.0 grant types: Authorization code grant ✅
   - OpenID Connect scopes: openid, email, profile ✅

4. **Save changes**

### Step 4: Update Your Code
After Google is configured, enable the Google button:

```typescript
// In AuthButton.tsx, change this:
<button
  onClick={() => handleSocialSignIn('Google')}
  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 opacity-50"
  disabled
>
  Sign in with Google (Setup Required)
</button>

// To this:
<button
  onClick={() => handleSocialSignIn('Google')}
  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Sign in with Google
</button>
```

## For Now - Test Email Login:
1. **Deploy your current changes**
2. **Click "Sign in with Email"**
3. **Should work without any additional setup**
4. **Create a test account with email/password**

## Common Google Setup Issues:
- **Redirect URI mismatch**: Must be exact Cognito domain
- **API not enabled**: Enable Google+ API in Google Console
- **Wrong client type**: Must be "Web application"
- **Scopes**: Use `openid email profile`

The email login should work immediately, and you can add Google later if needed!
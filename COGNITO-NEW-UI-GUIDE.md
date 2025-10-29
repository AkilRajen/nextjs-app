# AWS Cognito - New Interface (2024) - Client ID Location

## Yes, AWS Updated the Cognito UI!

You're seeing the **new Cognito interface** where "App clients" is now in the **left sidebar**.

## Updated Instructions for New UI:

### Finding Your Client ID (New Interface):

1. **Go to AWS Cognito Console**
   - Navigate to your User Pool

2. **Left Sidebar Navigation:**
   - Look at the left sidebar menu
   - Click on **"App clients"** (in the left menu)

3. **App Clients Page:**
   - You'll see a list of your app clients
   - Find your app client (e.g., "nextjs-client")
   - The **Client ID** is displayed in the list
   - Copy the Client ID value

### Alternative Method (New UI):

1. **Click on your app client name** in the App clients list
2. **On the app client details page:**
   - Client ID is shown at the top
   - Copy this value

## New UI Sidebar Structure:

```
Your User Pool
├── General settings
├── Sign-in experience  
├── Sign-up experience
├── Message delivery
├── App clients ← CLICK HERE
├── User pool properties
├── Lambda triggers
└── Analytics
```

## What You're Looking For:

The Client ID still looks the same:
```
Client ID: 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

## If You Don't Have an App Client Yet:

1. **Click "App clients" in left sidebar**
2. **Click "Create app client" button**
3. **Configure:**
   - App type: **Public client**
   - App client name: `nextjs-client`
   - Generate client secret: **NO** ❌
   - Authentication flows: Keep defaults

4. **Advanced settings (if shown):**
   - Refresh token expiration: 30 days (default)
   - Access token expiration: 60 minutes (default)
   - ID token expiration: 60 minutes (default)

5. **Click "Create app client"**

## Hosted UI Configuration (New Interface):

After creating the app client:

1. **Still in "App clients" section**
2. **Click on your app client name**
3. **Look for "Hosted UI" section** (might be a tab or section)
4. **Configure:**
   - Callback URLs: `http://localhost:3000/`
   - Sign-out URLs: `http://localhost:3000/`
   - Identity providers: Cognito user pool
   - OAuth 2.0 grant types: Authorization code grant
   - OpenID Connect scopes: openid, email, profile

## Domain Configuration (New Interface):

1. **Look for "Domain" in the left sidebar** OR
2. **In App clients → Your client → Hosted UI settings**
3. **Set up domain:**
   - Use Cognito domain
   - Domain prefix: `your-app-auth-2024`

## Summary for New UI:

**Client ID Location**: Left sidebar → **App clients** → Your client → Copy Client ID

**Domain Location**: Left sidebar → **Domain** OR App clients → Hosted UI

**The values you need are the same**, just the navigation has changed!

## Your .env.local Values:

```env
# From General settings (or top of any page)
NEXT_PUBLIC_USER_POOL_ID=us-east-1_ABC123XYZ

# From App clients → Your client
NEXT_PUBLIC_USER_POOL_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p

# From Domain section
NEXT_PUBLIC_OAUTH_DOMAIN=your-app-auth.auth.us-east-1.amazoncognito.com

# Your app URLs
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```
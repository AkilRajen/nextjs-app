# How to Find Your User Pool Client ID

## Step-by-Step Instructions:

### Method 1: From User Pool Dashboard (Easiest)

1. **Go to AWS Cognito Console**
   - Navigate to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
   - Click on your User Pool name (e.g., "nextjs-auth-pool")

2. **Click "App integration" Tab**
   - You'll see tabs: General settings, Sign-in experience, Sign-up experience, etc.
   - Click on the **"App integration"** tab

3. **Scroll Down to "App clients and analytics"**
   - Scroll down on the App integration page
   - Look for section titled **"App clients and analytics"**

4. **Find Your Client ID**
   - You'll see a table with your app client
   - The **Client ID** column shows your value
   - It looks like: `1a2b3c4d5e6f7g8h9i0j1k2l` (random letters/numbers)
   - Click the **copy icon** next to it

### Method 2: From App Client Details

1. **In the "App clients and analytics" section**
2. **Click on your app client name** (e.g., "nextjs-client")
3. **On the app client details page:**
   - You'll see "Client ID" at the top
   - Copy this value

### What You're Looking For:

The Client ID looks like this:
```
1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

**NOT** the User Pool ID (which looks like `us-east-1_ABC123XYZ`)

### Visual Guide:

```
AWS Cognito Console
└── Your User Pool (nextjs-auth-pool)
    └── App integration tab
        └── App clients and analytics section
            └── Client ID: 1a2b3c4d5e6f7g8h... ← THIS IS WHAT YOU NEED
```

### Common Locations Where People Look (Wrong):

❌ **General settings tab** - This shows User Pool ID, not Client ID
❌ **User Pool ID** - This is different (us-east-1_XXXXXXX format)
❌ **Domain section** - This shows your auth domain, not Client ID

### Correct Location:

✅ **App integration tab** → **App clients and analytics** → **Client ID column**

### If You Don't See App Clients:

This means you didn't create an app client during User Pool setup. To fix:

1. **Go to App integration tab**
2. **Scroll to "App clients and analytics"**
3. **Click "Create app client"**
4. **Configure:**
   - App type: **Public client**
   - App client name: `nextjs-client`
   - Generate client secret: **NO** (important!)
   - Authentication flows: Default is fine

### Your Final .env.local Should Look Like:

```env
# User Pool ID (from General settings)
NEXT_PUBLIC_USER_POOL_ID=us-east-1_ABC123XYZ

# Client ID (from App integration → App clients)
NEXT_PUBLIC_USER_POOL_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p

# Domain (from App integration → Domain)
NEXT_PUBLIC_OAUTH_DOMAIN=your-app-auth.auth.us-east-1.amazoncognito.com

# Redirect URLs
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```

### Still Can't Find It?

If you're still having trouble:
1. Make sure you're in the correct User Pool
2. Check that you created an app client during setup
3. Look for "App clients and analytics" section (not "App clients" - the wording matters)
4. The Client ID is usually 26-32 characters long, all lowercase letters and numbers
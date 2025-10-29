# Vercel Authentication Troubleshooting Guide

## Issue: Authentication page not appearing on Vercel

### ✅ Step 1: Switch to Real Auth Component (FIXED)
**Problem**: You were using the mock component
**Solution**: Updated `page.tsx` to use real `AuthButton` component

### ✅ Step 2: Check Environment Variables in Vercel
1. **Go to Vercel Dashboard**
2. **Your Project → Settings → Environment Variables**
3. **Verify these are set:**
   ```
   NEXT_PUBLIC_USER_POOL_ID
   NEXT_PUBLIC_USER_POOL_CLIENT_ID
   NEXT_PUBLIC_OAUTH_DOMAIN
   NEXT_PUBLIC_REDIRECT_SIGN_IN
   NEXT_PUBLIC_REDIRECT_SIGN_OUT
   ```

### ✅ Step 3: Update Redirect URLs in Cognito
**Critical**: Your Cognito callback URLs must match your Vercel domain

1. **Go to AWS Cognito Console**
2. **Your User Pool → App clients (left sidebar)**
3. **Click your app client**
4. **Update Hosted UI settings:**
   - Callback URLs: `https://your-app.vercel.app/`
   - Sign-out URLs: `https://your-app.vercel.app/`

### ✅ Step 4: Update Environment Variables
**In Vercel Dashboard**, update these values:
```
NEXT_PUBLIC_REDIRECT_SIGN_IN=https://your-app.vercel.app/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=https://your-app.vercel.app/
```

### ✅ Step 5: Redeploy
After updating environment variables:
1. **Go to Vercel Dashboard → Deployments**
2. **Click "Redeploy" on latest deployment**
3. **Or push a new commit to trigger rebuild**

## Common Issues & Solutions:

### Issue 1: "Missing OAuth configuration" Error
**Check**: Browser console for this error
**Solution**: Environment variables not set in Vercel
- Go to Vercel → Settings → Environment Variables
- Add all required variables
- Redeploy

### Issue 2: Redirect URI Mismatch
**Symptoms**: Error after clicking login button
**Solution**: Update Cognito callback URLs to match Vercel domain
- Cognito: `https://your-app.vercel.app/`
- Vercel env: `NEXT_PUBLIC_REDIRECT_SIGN_IN=https://your-app.vercel.app/`

### Issue 3: Buttons Don't Work
**Check**: Browser console for JavaScript errors
**Common causes**:
- Environment variables missing
- Wrong component imported (mock vs real)
- Amplify configuration errors

### Issue 4: Authentication Flow Starts But Fails
**Symptoms**: Redirects to Cognito but fails to return
**Solutions**:
1. Check Cognito callback URLs match exactly
2. Verify OAuth scopes are correct
3. Check client ID is correct

## Debug Steps:

### 1. Check Browser Console
Open browser dev tools → Console tab
Look for errors like:
- "Missing OAuth configuration"
- "Failed to fetch"
- Amplify configuration errors

### 2. Test OAuth URL Manually
In browser console, run:
```javascript
console.log('Domain:', process.env.NEXT_PUBLIC_OAUTH_DOMAIN);
console.log('Client ID:', process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID);
console.log('Redirect:', process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN);
```

### 3. Test Direct OAuth URL
Visit this URL directly (replace with your values):
```
https://YOUR_DOMAIN.auth.region.amazoncognito.com/login?client_id=YOUR_CLIENT_ID&response_type=code&scope=openid+email+profile&redirect_uri=https://your-app.vercel.app/
```

### 4. Check Network Tab
- Click login button
- Check Network tab for failed requests
- Look for 400/500 errors

## Verification Checklist:

### ✅ Vercel Setup:
- [ ] Environment variables added to Vercel
- [ ] Real AuthButton component imported (not mock)
- [ ] App deployed successfully
- [ ] No build errors

### ✅ Cognito Setup:
- [ ] User Pool created
- [ ] App client created (public, no secret)
- [ ] Hosted UI enabled
- [ ] Callback URLs match Vercel domain
- [ ] OAuth scopes: openid, email, profile

### ✅ Environment Variables Match:
- [ ] `NEXT_PUBLIC_OAUTH_DOMAIN` = Cognito domain
- [ ] `NEXT_PUBLIC_USER_POOL_CLIENT_ID` = App client ID
- [ ] `NEXT_PUBLIC_REDIRECT_SIGN_IN` = Vercel app URL
- [ ] All variables set in both local and Vercel

## Quick Test:
1. Visit your Vercel app
2. Open browser console
3. Click a login button
4. Should redirect to Cognito hosted UI
5. Should show login/signup form

If step 4 fails, check environment variables and Cognito configuration.
If step 5 fails, check Cognito callback URLs and OAuth settings.
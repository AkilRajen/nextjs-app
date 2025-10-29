# Cognito User Pool - Quick Setup Checklist

## 🎯 Goal: Email-only login for Next.js app

### ✅ Step 1: Sign-in Experience
- [ ] Cognito user pool ✓
- [ ] Email ✓ (Username ❌)
- [ ] No MFA

### ✅ Step 2: Security Requirements  
- [ ] Cognito defaults for password
- [ ] Email recovery only

### ✅ Step 3: Sign-up Experience
- [ ] Enable self-registration ✓
- [ ] Auto verification ✓
- [ ] Required attribute: email ✓

### ✅ Step 4: Message Delivery
- [ ] Send email with Cognito ✓

### ✅ Step 5: App Integration
- [ ] User pool name: `nextjs-auth-pool`
- [ ] Use Cognito Hosted UI ✓
- [ ] Cognito domain: `your-app-auth-2024`
- [ ] Public client ✓
- [ ] NO client secret ❌
- [ ] Callback URL: `http://localhost:3000/`
- [ ] Authorization code grant ✓
- [ ] Scopes: OpenID, Email, Profile ✓

### ✅ Step 6: Copy Values
- [ ] User Pool ID → `.env.local`
- [ ] Client ID → `.env.local`  
- [ ] Domain → `.env.local`

### ✅ Step 7: Test
- [ ] `npm run dev`
- [ ] Click login button
- [ ] See Cognito hosted UI
- [ ] Create test account

## 🚨 Critical Settings:
- **Public client** (not confidential)
- **No client secret**
- **Email sign-in only**
- **Hosted UI enabled**
- **Authorization code grant**

## 📝 Environment Variables Template:
```env
NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_USER_POOL_CLIENT_ID=1234567890abcdef
NEXT_PUBLIC_OAUTH_DOMAIN=your-app-auth-2024.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```
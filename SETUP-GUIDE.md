# Complete Setup Guide: Next.js + AWS Cognito + Vercel

## 🎯 What You'll Build
A Next.js app with email authentication using AWS Cognito, deployed on Vercel for free.

---

## 📋 Part 1: AWS Cognito Setup

### Step 1: Create User Pool
1. **Go to [AWS Console](https://console.aws.amazon.com/) → Search "Cognito"**
2. **Click "Create user pool"**

### Step 2: Configure Sign-in Experience
- **Authentication providers**: Cognito user pool ✅
- **Sign-in options**: Email ✅ (uncheck Username)
- **MFA**: No MFA
- **Click "Next"**

### Step 3: Configure Security Requirements
- **Password policy**: Cognito defaults
- **Account recovery**: Email only ✅
- **Click "Next"**

### Step 4: Configure Sign-up Experience
- **Self-registration**: Enable ✅
- **Required attributes**: email ✅
- **Click "Next"**

### Step 5: Configure Message Delivery
- **Email**: Send email with Cognito ✅
- **Click "Next"**

### Step 6: Integrate Your App
- **User pool name**: `nextjs-auth`
- **Hosted UI**: Use the Cognito Hosted UI ✅
- **Domain**: Use Cognito domain → Enter prefix: `your-app-auth-2024`
- **App client**:
  - **App type**: Public client ✅
  - **App client name**: `nextjs-client`
  - **Generate client secret**: NO ❌
- **Callback URLs**: `http://localhost:3000/,https://your-app.vercel.app/`
- **Sign-out URLs**: `http://localhost:3000/,https://your-app.vercel.app/`
- **OAuth grant types**: Authorization code grant ✅
- **Scopes**: openid, email, profile ✅
- **Click "Next" → "Create user pool"**

### Step 7: Get Your Values
After creation, copy these values:

**User Pool ID**: (from main page) `us-east-1_XXXXXXXXX`
**Client ID**: Left sidebar → App clients → Copy Client ID
**Domain**: Left sidebar → Domain → Copy domain (without https://)

---

## 📋 Part 2: Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Cognito authentication"
git push origin main
```

### Step 2: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import your repository**
4. **Click "Deploy"**

### Step 3: Add Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_OAUTH_DOMAIN=your-prefix.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_REDIRECT_SIGN_IN=https://your-app.vercel.app/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=https://your-app.vercel.app/
```

### Step 4: Update Cognito Callback URLs
1. **Go back to AWS Cognito → Your User Pool → App clients**
2. **Click your app client**
3. **Update Hosted UI settings**:
   - **Callback URLs**: `https://your-actual-vercel-url.vercel.app/`
   - **Sign-out URLs**: `https://your-actual-vercel-url.vercel.app/`

### Step 5: Redeploy
In Vercel Dashboard → Deployments → Click "Redeploy"

---

## 🧪 Part 3: Testing

### Test the Flow:
1. **Visit your Vercel app**
2. **Click "Sign in with Email"**
3. **Should redirect to Cognito hosted UI**
4. **Create account with email/password**
5. **Should redirect back and show "Welcome, [email]!"**

### If You Get Errors:

**404 Error**: Check environment variables in Vercel
**"Login pages unavailable"**: Check Hosted UI is enabled in Cognito
**Redirect errors**: Check callback URLs match exactly

---

## 📁 Project Structure

Your clean project now has:

```
src/
├── app/
│   ├── layout.tsx          # Amplify provider wrapper
│   └── page.tsx            # Main page with auth button
├── components/
│   ├── AmplifyProvider.tsx # Amplify configuration wrapper
│   └── AuthButton.tsx      # Clean auth component
└── lib/
    └── amplify-config.ts   # Amplify configuration
```

---

## 🔧 Key Files

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id
NEXT_PUBLIC_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```

### Dependencies (already installed)
- `aws-amplify` - AWS authentication
- `@aws-amplify/ui-react` - UI components

---

## ✅ Success Checklist

- [ ] Cognito User Pool created with email sign-in
- [ ] Hosted UI enabled with correct settings
- [ ] App client is public with no client secret
- [ ] Domain created and active
- [ ] Vercel app deployed successfully
- [ ] Environment variables added to Vercel
- [ ] Callback URLs updated in Cognito
- [ ] Authentication flow works end-to-end

---

## 💰 Cost: $0

- **Vercel**: Free tier (100GB bandwidth)
- **AWS Cognito**: Free tier (50,000 users)
- **Total**: $0/month for most projects

---

## 🚀 You're Done!

Your Next.js app now has:
- ✅ Email/password authentication
- ✅ Secure user sessions
- ✅ Free hosting on Vercel
- ✅ Scalable AWS Cognito backend

Users can sign up, sign in, and sign out with their email addresses!
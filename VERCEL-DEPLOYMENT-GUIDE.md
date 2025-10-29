# Deploy to Vercel (Free Alternative to Amplify)

## Why Vercel Instead of Amplify?
- **Free hosting** for personal projects
- **Same functionality** - your code works unchanged
- **Still use AWS Cognito** for authentication
- **Better Next.js integration**

## Quick Deployment Steps:

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (uses default Next.js settings)

### 3. Add Environment Variables
In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add these variables:
   ```
   NEXT_PUBLIC_USER_POOL_ID
   NEXT_PUBLIC_USER_POOL_CLIENT_ID
   NEXT_PUBLIC_OAUTH_DOMAIN
   NEXT_PUBLIC_REDIRECT_SIGN_IN
   NEXT_PUBLIC_REDIRECT_SIGN_OUT
   ```

### 4. Update Cognito Redirect URLs
1. Go to AWS Cognito Console
2. Your User Pool → App Integration → App Client
3. Update Hosted UI settings:
   - Callback URLs: `https://your-app.vercel.app/`
   - Sign-out URLs: `https://your-app.vercel.app/`

### 5. Redeploy
Vercel will automatically redeploy when you push to GitHub.

## Your Environment Variables:
Update `.env.local` and Vercel with your actual domain:
```
NEXT_PUBLIC_REDIRECT_SIGN_IN=https://your-app.vercel.app/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=https://your-app.vercel.app/
```

## Cost: $0/month
- Vercel: Free tier (100GB bandwidth)
- AWS Cognito: Free tier (50k users)
- Total: $0 for most projects

## Automatic Deployments:
Every time you push to GitHub, Vercel automatically:
1. Builds your app
2. Deploys the new version
3. Updates your live site

Perfect for development and production!
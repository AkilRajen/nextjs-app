# Quick Deployment Guide

## 1. Push to Git Repository
```bash
git add .
git commit -m "Add AWS Amplify with Cognito social login"
git push origin main
```

## 2. AWS Amplify Console Setup
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Use these build settings (or the auto-detected `amplify.yml`):
   - Build command: `npm run build`
   - Base directory: (leave empty)
   - Build output directory: `.next`

## 3. Environment Variables in Amplify
Add these in Amplify Console → App Settings → Environment Variables:
- `NEXT_PUBLIC_USER_POOL_ID`
- `NEXT_PUBLIC_USER_POOL_CLIENT_ID` 
- `NEXT_PUBLIC_OAUTH_DOMAIN`
- `NEXT_PUBLIC_REDIRECT_SIGN_IN`
- `NEXT_PUBLIC_REDIRECT_SIGN_OUT`

## 4. Cognito Setup
Follow the detailed steps in `README-AMPLIFY-SETUP.md`

## 5. Test
Your app will be available at the Amplify-provided URL after deployment.
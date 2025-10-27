# AWS Amplify Setup with Cognito Social Login

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js and npm installed

## Setup Steps

### 1. Deploy to AWS Amplify

1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Go to AWS Amplify Console**
3. **Connect your repository**
4. **Use the provided `amplify.yml` for build settings**

### 2. Set up Cognito User Pool

1. **Go to AWS Cognito Console**
2. **Create a new User Pool**
3. **Configure sign-in options:**
   - Enable Email
   - Disable Username
4. **Configure security requirements:**
   - Set password policy as needed
   - Enable MFA if desired
5. **Configure sign-up experience:**
   - Enable self-registration
   - Configure required attributes (email)
6. **Configure message delivery:**
   - Use Cognito default for email (or configure SES)
7. **Integrate your app:**
   - Create app client
   - Enable "Generate client secret" = NO
   - Configure OAuth 2.0 settings:
     - Allowed callback URLs: `https://your-domain.com/`
     - Allowed sign-out URLs: `https://your-domain.com/`
     - OAuth 2.0 grant types: Authorization code grant
     - OAuth 2.0 scopes: openid, email, profile

### 3. Configure Social Identity Providers

#### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your Cognito domain to authorized origins
6. In Cognito, add Google as identity provider with your client ID and secret

#### Facebook
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure Valid OAuth Redirect URIs with your Cognito domain
5. In Cognito, add Facebook as identity provider with your app ID and secret

#### Amazon
1. Go to [Login with Amazon](https://developer.amazon.com/loginwithamazon)
2. Create a new security profile
3. Configure allowed return URLs with your Cognito domain
4. In Cognito, add Amazon as identity provider with your client ID and secret

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Update the values with your Cognito configuration:
- `NEXT_PUBLIC_USER_POOL_ID`: From Cognito User Pool
- `NEXT_PUBLIC_USER_POOL_CLIENT_ID`: From Cognito App Client
- `NEXT_PUBLIC_OAUTH_DOMAIN`: Your Cognito domain
- `NEXT_PUBLIC_REDIRECT_SIGN_IN`: Your app URL
- `NEXT_PUBLIC_REDIRECT_SIGN_OUT`: Your app URL

### 5. Add Environment Variables to Amplify

In AWS Amplify Console:
1. Go to your app
2. Click on "Environment variables" in the left sidebar
3. Add all the environment variables from your `.env.local`

### 6. Deploy and Test

1. Push your changes to trigger a new build
2. Test the social login functionality
3. Check CloudWatch logs if there are any issues

## Troubleshooting

- **Redirect mismatch**: Ensure callback URLs match exactly in all providers
- **CORS issues**: Check that your domain is properly configured in Cognito
- **Environment variables**: Verify all variables are set correctly in Amplify Console
- **Social provider setup**: Double-check client IDs and secrets in Cognito

## Security Notes

- Never commit `.env.local` to version control
- Use HTTPS in production
- Regularly rotate client secrets
- Monitor CloudWatch logs for suspicious activity
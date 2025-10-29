# AWS Cognito User Pool Setup - Email Login Only

## Step-by-Step Guide with Dashboard Screenshots

### Step 1: Access AWS Cognito Console
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Search for "Cognito" in the services search bar
3. Click on "Amazon Cognito"
4. Click "Create user pool" button

### Step 2: Configure Sign-in Experience
**Page: "Configure sign-in experience"**

**Authentication providers:**
- ✅ **Cognito user pool** (selected by default)

**Cognito user pool sign-in options:**
- ❌ Username (uncheck this)
- ✅ **Email** (check this box)
- ❌ Phone number (leave unchecked)

**Multi-factor authentication (MFA):**
- Select **"No MFA"** (for simplicity)
- Or choose "Optional" if you want MFA available

Click **"Next"** button

### Step 3: Configure Security Requirements
**Page: "Configure security requirements"**

**Password policy:**
- Use **"Cognito defaults"** (recommended)
- Or customize if needed:
  - Minimum length: 8 characters
  - Require uppercase, lowercase, numbers, symbols (as desired)

**Multi-factor authentication (MFA):**
- Keep **"No MFA"** selected (or Optional)

**User account recovery:**
- ✅ **"Enable self-service account recovery"**
- Recovery methods: **"Email only"**

Click **"Next"** button

### Step 4: Configure Sign-up Experience
**Page: "Configure sign-up experience"**

**Self-registration:**
- ✅ **"Enable self-registration"** (allows users to create accounts)

**Cognito-assisted verification and confirmation:**
- ✅ **"Allow Cognito to automatically send messages to verify and confirm"**

**Verifying attribute changes:**
- ✅ **"Keep original attribute value active when an update is pending"**

**Required attributes:**
- ✅ **email** (check this - it's required for email login)
- ❌ Leave others unchecked unless needed

**Custom attributes:** (optional)
- Leave empty for basic setup

Click **"Next"** button

### Step 5: Configure Message Delivery
**Page: "Configure message delivery"**

**Email:**
- Select **"Send email with Cognito"** (free option)
- FROM email address: `no-reply@verificationemail.com` (default)
- Reply-to email address: (leave empty)

**SMS:** (skip this section since we're not using phone numbers)

Click **"Next"** button

### Step 6: Integrate Your App
**Page: "Integrate your app"**

**User pool name:**
- Enter: `nextjs-auth-pool` (or any name you prefer)

**Hosted authentication pages:**
- ✅ **"Use the Cognito Hosted UI"** (check this box)

**Domain:**
- Select **"Use a Cognito domain"**
- Domain prefix: Enter something unique like `your-app-name-auth-2024`
- Click "Check availability" to verify it's available

**Initial app client:**
- App type: **"Public client"** (important!)
- App client name: `nextjs-client`
- Client secret: **"Don't generate a client secret"** (important!)

**Allowed callback URLs:**
- For local testing: `http://localhost:3000/`
- For production: `https://your-domain.com/` (add later)

**Allowed sign-out URLs:**
- Same as callback URLs: `http://localhost:3000/`

**Identity providers:**
- ✅ **Cognito user pool** (checked by default)
- Social providers: Leave unchecked for now (we'll add later)

**OAuth 2.0 grant types:**
- ✅ **Authorization code grant** (check this)
- ❌ Implicit grant (leave unchecked)

**OpenID Connect scopes:**
- ✅ **OpenID** (required)
- ✅ **Email** (required)
- ✅ **Profile** (recommended)
- ❌ Phone, aws.cognito.signin.user.admin (optional)

Click **"Next"** button

### Step 7: Review and Create
**Page: "Review and create"**

Review all your settings:
- Sign-in: Email only
- MFA: Disabled (or optional)
- Self-registration: Enabled
- Required attributes: Email
- Hosted UI: Enabled
- App client: Public client, no secret

Click **"Create user pool"** button

### Step 8: Get Your Configuration Values
After creation, you'll see your User Pool dashboard.

**Copy these values for your `.env.local`:**

1. **User Pool ID:**
   - Found at the top: `us-east-1_XXXXXXXXX`

2. **App Client ID:**
   - Go to "App integration" tab
   - Scroll down to "App clients and analytics"
   - Copy the "Client ID"

3. **Cognito Domain:**
   - In "App integration" tab
   - Under "Domain" section
   - Copy the full domain: `your-prefix.auth.us-east-1.amazoncognito.com`

### Step 9: Update Your Environment Variables
Update your `.env.local` file:

```env
NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_OAUTH_DOMAIN=your-prefix.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_REDIRECT_SIGN_IN=http://localhost:3000/
NEXT_PUBLIC_REDIRECT_SIGN_OUT=http://localhost:3000/
```

### Step 10: Test Your Setup
1. Run your Next.js app: `npm run dev`
2. Go to `http://localhost:3000`
3. Click any social login button
4. Should redirect to Cognito hosted UI
5. You can create a test account with email/password

## Important Notes:

### ✅ Correct Settings:
- **Email sign-in only** (no username)
- **Public client** (no client secret)
- **Authorization code grant**
- **Hosted UI enabled**
- **Self-registration enabled**

### ❌ Common Mistakes:
- Don't enable client secret (breaks the flow)
- Don't forget to enable Hosted UI
- Don't use private client type
- Don't forget email in required attributes

### Next Steps:
- Test email login works
- Add social providers (Google, Facebook) later
- Update callback URLs when you deploy to production

## Troubleshooting:
- **"Invalid redirect URI"**: Check callback URLs match exactly
- **"Client secret required"**: Recreate app client without secret
- **"User not confirmed"**: Check email verification settings
# AWS Cost Monitoring for Local Testing

## Expected Costs: $0

For local testing with Cognito, you should see **$0 charges** because:
- Cognito free tier: 50,000 monthly active users
- You're only testing with a few accounts
- No Amplify hosting costs (running locally)

## How to Monitor Costs:

### 1. Set Up Billing Alerts
1. Go to AWS Billing Console
2. Create a billing alert for $1 (or any small amount)
3. You'll get notified if any charges occur

### 2. Check AWS Cost Explorer
- Go to AWS Cost and Billing Dashboard
- Filter by service: "Amazon Cognito"
- Should show $0.00 for testing usage

### 3. Monitor Cognito Usage
- Go to Cognito Console
- Check "Monthly Active Users" in your User Pool
- Should be very low numbers for testing

## Cost Breakdown by Service:

### Cognito User Pool
- **Free tier**: 50,000 MAUs/month
- **Your usage**: 1-10 test users
- **Cost**: $0

### Social Identity Providers
- **Google OAuth**: Free for development
- **Facebook Login**: Free for development  
- **Amazon Login**: Free for development
- **Your usage**: Testing only
- **Cost**: $0

### What Could Cause Charges:
1. **Exceeding 50k users** (very unlikely in testing)
2. **Advanced security features** beyond free tier
3. **SMS for MFA** ($0.00645 per SMS - only if you enable SMS MFA)

## Best Practices to Avoid Charges:

### 1. Use Test Users Sparingly
- Create 2-3 test accounts maximum
- Delete test users when done testing
- Don't create automated tests that spam user creation

### 2. Disable Unused Features
- Don't enable SMS MFA for testing
- Stick to basic authentication features
- Avoid advanced security features unless needed

### 3. Clean Up After Testing
```bash
# When done testing, you can delete test users via AWS Console
# Or keep the User Pool for future development (still free)
```

### 4. Monitor Your Bill
- Check AWS billing dashboard weekly
- Set up $1 billing alert as safety net
- Most testing should result in $0 charges

## If You See Unexpected Charges:

1. **Check Cognito metrics** - Look for unusual user activity
2. **Review enabled features** - Disable SMS MFA if enabled
3. **Check other AWS services** - Make sure you didn't accidentally create other resources
4. **Contact AWS Support** - They're helpful with billing questions

## Alternative: AWS Free Tier Account

If you're worried about costs:
- Create a new AWS account (gets 12 months free tier)
- Use only for testing this project
- Even more generous free limits

## Summary:
**Expected cost for local testing: $0**
**Recommended monitoring: Set $1 billing alert**
**Risk level: Very low**
// Simple script to test if your environment variables are properly loaded
// Run with: node test-local-setup.js

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking local environment setup...\n');

const requiredVars = [
  'NEXT_PUBLIC_USER_POOL_ID',
  'NEXT_PUBLIC_USER_POOL_CLIENT_ID',
  'NEXT_PUBLIC_OAUTH_DOMAIN',
  'NEXT_PUBLIC_REDIRECT_SIGN_IN',
  'NEXT_PUBLIC_REDIRECT_SIGN_OUT'
];

let allSet = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allSet = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allSet) {
  console.log('🎉 All environment variables are set!');
  console.log('You can now run: npm run dev');
  
  // Generate test OAuth URL
  const domain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;
  
  if (domain && clientId && redirectUri) {
    console.log('\n🔗 Test OAuth URL:');
    console.log(`https://${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri)}`);
  }
} else {
  console.log('❌ Please set all required environment variables in .env.local');
  console.log('Copy .env.local.example to .env.local and fill in your AWS Cognito values');
}

console.log('\n📖 For detailed setup instructions, see LOCAL-TESTING-GUIDE.md');
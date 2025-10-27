'use client';

import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

interface User {
  username: string;
  userId: string;
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser({
        username: currentUser.username,
        userId: currentUser.userId,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = (provider: 'Google' | 'Facebook' | 'Amazon') => {
    const oauthDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;
    
    if (!oauthDomain || !clientId || !redirectUri) {
      console.error('Missing OAuth configuration');
      return;
    }

    const oauthUrl = `https://${oauthDomain}/oauth2/authorize?identity_provider=${provider}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=CODE&client_id=${clientId}&scope=openid+email+profile`;
    window.location.href = oauthUrl;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (user) {
    return (
      <div className="p-4 border rounded-lg">
        <p className="mb-2">Welcome, {user.username}!</p>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-4 text-lg font-semibold">Sign In</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleSocialSignIn('Google')}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleSocialSignIn('Facebook')}
          className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Sign in with Facebook
        </button>
        <button
          onClick={() => handleSocialSignIn('Amazon')}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Sign in with Amazon
        </button>
      </div>
    </div>
  );
}
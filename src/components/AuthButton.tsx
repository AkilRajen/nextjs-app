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

    const handleEmailSignIn = () => {
        const oauthDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
        const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;

        if (!oauthDomain || !clientId || !redirectUri) {
            console.error('Missing OAuth configuration');
            return;
        }

        // Basic Cognito hosted UI (email/password login)
        const oauthUrl = `https://${oauthDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = oauthUrl;
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
                    onClick={handleEmailSignIn}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Sign in with Email
                </button>
                <div className="text-sm text-gray-500 text-center my-2">
                    Social login (requires setup):
                </div>
                <button
                    onClick={() => handleSocialSignIn('Google')}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 opacity-50"
                    disabled
                >
                    Sign in with Google (Setup Required)
                </button>
                <button
                    onClick={() => handleSocialSignIn('Facebook')}
                    className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 opacity-50"
                    disabled
                >
                    Sign in with Facebook (Setup Required)
                </button>
            </div>
        </div>
    );
}
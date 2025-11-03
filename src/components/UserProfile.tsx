'use client';

import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { configureAmplify } from '@/lib/amplify-config';

interface User {
    username: string;
    userId: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        configureAmplify();
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

    const handleSignIn = async () => {
        if (typeof window === 'undefined') return;

        const oauthDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
        const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;

        
        if (!oauthDomain || !clientId || !redirectUri) {
            console.error('Missing OAuth configuration');
            return;
        }

        const oauthUrl = `https://${oauthDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email&redirect_uri=${redirectUri}`;
        
        // Also log to Next.js server terminal
        try {
            await fetch('/api/debug-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oauthDomain,
                    clientId,
                    redirectUri,
                    oauthUrl
                })
            });
        } catch (error) {
            console.error('Failed to log to server:', error);
        }

        window.location.href = oauthUrl;
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        );
    }

    if (loading) {
        return (
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        );
    }

    // Show login button if not authenticated
    if (!user) {
        return (
            <div className="flex space-x-2">
                <button
                    onClick={handleSignIn}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Sign In
                </button>
                <button
                    onClick={async () => {
                        console.log('=== DEBUG INFO (Browser) ===');
                        console.log('Domain:', process.env.NEXT_PUBLIC_OAUTH_DOMAIN);
                        console.log('Client ID:', process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID);
                        console.log('Redirect:', process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN);

                        // Also log to Next.js terminal
                        try {
                            await fetch('/api/debug-auth', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    oauthDomain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
                                    clientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
                                    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
                                    oauthUrl: 'Debug button clicked'
                                })
                            });
                            alert('Check both browser console AND Next.js terminal!');
                        } catch (error) {
                            console.error('Failed to log to server:', error);
                            alert('Check browser console (server logging failed)');
                        }
                    }}
                    className="px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                    🔍
                </button>
            </div>
        );
    }

    // Show user email and logout if authenticated
    return (
        <div className="flex items-center space-x-3">
            <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.username}
                </p>
            </div>
            <button
                onClick={handleSignOut}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                Sign Out
            </button>
        </div>
    );
}
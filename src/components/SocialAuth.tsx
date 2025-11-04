'use client';

import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { configureAmplify } from '@/lib/amplify-config';

interface User {
    username: string;
    userId: string;
}

export default function SocialAuth() {
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

    const handleSocialSignIn = async (provider: 'Google' | 'Facebook' | 'Amazon') => {
        if (typeof window === 'undefined') return;

        const oauthDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
        const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;

        if (!oauthDomain || !clientId || !redirectUri) {
            console.error('Missing OAuth configuration');
            return;
        }

        // Social provider OAuth URL
        const oauthUrl = `https://${oauthDomain}/oauth2/authorize?identity_provider=${provider}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=CODE&client_id=${clientId}&scope=openid+email+profile`;
        
        console.log(`${provider} OAuth URL:`, oauthUrl);
        
        // Log to server for debugging
        try {
            await fetch('/api/debug-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider,
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

    const handleEmailSignIn = async () => {
        if (typeof window === 'undefined') return;

        const oauthDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
        const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN;

        if (!oauthDomain || !clientId || !redirectUri) {
            console.error('Missing OAuth configuration');
            return;
        }

        // Email/password OAuth URL
        const oauthUrl = `https://${oauthDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri)}`;
        
        console.log('Email OAuth URL:', oauthUrl);
        
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
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
        );
    }

    if (loading) {
        return (
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
        );
    }

    // Show user profile if authenticated
    if (user) {
        return (
            <div className="flex items-center space-x-3 bg-white rounded-lg shadow-lg border px-4 py-3">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            {user.username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {user.username}
                        </p>
                        <p className="text-xs text-green-600">
                            ✓ Authenticated
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    // Show social login options if not authenticated
    return (
        <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[300px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Choose Sign In Method
            </h3>
            
            <div className="space-y-3">
                {/* Google Sign In */}
                <button
                    onClick={() => handleSocialSignIn('Google')}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                {/* Facebook Sign In */}
                <button
                    onClick={() => handleSocialSignIn('Facebook')}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-medium">Continue with Facebook</span>
                </button>

                {/* Amazon Sign In */}
                <button
                    onClick={() => handleSocialSignIn('Amazon')}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#FF9900] text-white rounded-lg hover:bg-[#E88B00] transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.83.615-3.268 0-6.306-.756-9.116-2.268-.44-.236-.81-.46-1.12-.67-.18-.12-.27-.22-.27-.31 0-.06.03-.11.09-.17l.045-.06zm23.565-4.455c-.315-.243-.62-.513-.92-.81-.298-.295-.61-.62-.93-.97-.32-.35-.62-.73-.91-1.14-.29-.41-.54-.85-.75-1.32-.21-.47-.37-.97-.48-1.51-.11-.54-.17-1.12-.17-1.74 0-.62.06-1.2.17-1.74.11-.54.27-1.04.48-1.51.21-.47.46-.91.75-1.32.29-.41.59-.79.91-1.14.32-.35.632-.675.93-.97.3-.297.605-.567.92-.81.315-.243.645-.463.99-.66.345-.197.705-.373 1.08-.528.375-.155.765-.29 1.17-.405.405-.115.825-.21 1.26-.285.435-.075.885-.135 1.35-.18.465-.045.945-.068 1.44-.068.495 0 .975.023 1.44.068.465.045.915.105 1.35.18.435.075.855.17 1.26.285.405.115.795.25 1.17.405.375.155.735.331 1.08.528.345.197.675.417.99.66z"/>
                    </svg>
                    <span className="font-medium">Continue with Amazon</span>
                </button>

                {/* Divider */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>

                {/* Email Sign In */}
                <button
                    onClick={handleEmailSignIn}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Continue with Email</span>
                </button>
            </div>

            {/* Debug Info */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <details className="text-xs">
                    <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                        Debug Info
                    </summary>
                    <div className="mt-2 p-2 bg-gray-50 rounded text-gray-600">
                        <div>Domain: {process.env.NEXT_PUBLIC_OAUTH_DOMAIN}</div>
                        <div>Client: {process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}</div>
                        <div>Redirect: {process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN}</div>
                    </div>
                </details>
            </div>
        </div>
    );
}
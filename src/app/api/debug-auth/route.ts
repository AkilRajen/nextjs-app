import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // This will show in Next.js terminal
        console.log('=== AUTH DEBUG (Server Side) ===');
        console.log('OAuth Domain:', body.oauthDomain);
        console.log('Client ID:', body.clientId);
        console.log('Redirect URI:', body.redirectUri);
        console.log('Generated URL:', body.oauthUrl);
        console.log('================================');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Debug API error:', error);
        return NextResponse.json({ error: 'Failed to log debug info' }, { status: 500 });
    }
}
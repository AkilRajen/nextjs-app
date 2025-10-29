'use client';

import { useState } from 'react';

export default function AuthButtonMock() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user] = useState({ username: 'Test User' });

  if (isSignedIn) {
    return (
      <div className="p-4 border rounded-lg">
        <p className="mb-2">Welcome, {user.username}! (Mock Mode)</p>
        <button
          onClick={() => setIsSignedIn(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-4 text-lg font-semibold">Sign In (Mock Mode)</h3>
      <div className="space-y-2">
        <button
          onClick={() => setIsSignedIn(true)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mock Sign in with Google
        </button>
        <button
          onClick={() => setIsSignedIn(true)}
          className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Mock Sign in with Facebook
        </button>
        <button
          onClick={() => setIsSignedIn(true)}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Mock Sign in with Amazon
        </button>
      </div>
    </div>
  );
}
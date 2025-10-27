'use client';

import { useEffect } from 'react';
import amplifyConfig from '@/lib/amplify-config';

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Amplify is configured in the amplify-config file
  }, []);

  return <>{children}</>;
}
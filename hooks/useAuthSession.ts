import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { getAuthAccountToken } from '@/neup/core/auth/session';
type AuthSession = { token: string };
async function getAuthSession(): Promise<AuthSession | null> {
  const token = await getAuthAccountToken();
  return token ? { token } : null;
}

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setIsLoading(true);

      void getAuthSession().then((storedSession) => {
        if (!active) return;
        setSession(storedSession);
        setIsLoading(false);
      }).catch(() => { if (active) { setSession(null); setIsLoading(false); } });

      return () => {
        active = false;
      };
    }, []),
  );

  return { session, isLoading };
}

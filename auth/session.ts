import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_account';
let webToken: string | null = null;
const listeners = new Set<(token: string | null) => void>();
export function subscribeAuthAccountToken(listener: (token: string | null) => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Native sessions are persisted securely; web sessions remain in memory. */
export async function getAuthAccountToken(): Promise<string | null> {
  return Platform.OS === 'web' ? webToken : SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setAuthAccountToken(token: string | null): Promise<void> {
  const value = token?.trim() || null;
  if (Platform.OS === 'web') webToken = value;
  else if (value) await SecureStore.setItemAsync(TOKEN_KEY, value);
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
  for (const listener of listeners) listener(value);
}

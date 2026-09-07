import Constants from 'expo-constants';

/** Only public configuration belongs in an Expo bundle. */
export function getEnvVariable(name: string, optional = true): string {
  const values: Record<string, string | undefined> = {
    NEUP_APP_ID: process.env.EXPO_PUBLIC_NEUP_APP_ID,
    NEUPSITE_PROJECT_ID: process.env.EXPO_PUBLIC_NEUPSITE_PROJECT_ID,
    APP_NAME: Constants.expoConfig?.name,
    APP_URL: process.env.EXPO_PUBLIC_APP_URL,
  };
  const value = values[name]?.trim() || '';
  if (!value && !optional) throw new Error(`${name} public configuration is required.`);
  return value;
}

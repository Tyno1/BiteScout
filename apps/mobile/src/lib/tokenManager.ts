import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth-tokens';

interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
}

export const tokenManager = {
  // Get tokens from storage
  async getTokens(): Promise<TokenData> {
    try {
      const stored = await AsyncStorage.getItem(TOKEN_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return {
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
      };
    } catch (error) {
      console.error('Error getting tokens:', error);
      return {
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
      };
    }
  },

  // Save tokens to storage
  async setTokens(tokens: TokenData): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  },

  // Clear tokens from storage
  async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },

  // Check if token is expired
  isTokenExpired(expiresIn: number | null): boolean {
    if (!expiresIn) return true;
    return Date.now() >= expiresIn;
  },

  // Get current access token
  async getAccessToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens.accessToken;
  },

  // Check if we have valid tokens
  async hasValidTokens(): Promise<boolean> {
    const tokens = await this.getTokens();
    return !!(tokens.accessToken && !this.isTokenExpired(tokens.expiresIn));
  },
};

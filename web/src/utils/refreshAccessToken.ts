import axios from "axios";

const BACKEND_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(`${BACKEND_SERVER}/auth/refresh`, {
      refreshToken: token.refreshToken,
    });

    const refreshed = response.data;

    if (!refreshed.accessToken) {
      throw new Error("No access token returned");
    }

    return {
      ...token,
      accessToken: refreshed.accessToken,
      expiresIn: Date.now() + refreshed.expiresIn * 1000,
      refreshToken: refreshed.refreshToken ?? token.refreshToken, // fallback
    };
  } catch (error) {
    console.error("Error refreshing access token", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export default refreshAccessToken;

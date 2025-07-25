
import axios from "axios";

// Use the client-side backend URL for refresh requests
const BACKEND_CLIENT = process.env.BACKEND_URL_CLIENT || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

async function refreshAccessToken(token: { refreshToken: string }) {  
  try {    
    const response = await axios.post(`${BACKEND_CLIENT}/api/auth/refresh`, {
      refreshToken: token.refreshToken
    });

    const refreshed = response.data;
    
    if (!refreshed.accessToken) {      
      throw new Error("No access token returned");
    }

    return {
      ...token,
      accessToken: refreshed.accessToken,
      expiresIn: refreshed.expiresIn,
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

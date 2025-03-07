import axios from "axios";

const getUserInfoMiddleware = async (req, res, next) => {
  const issuer = process.env.AUTH0_ISSUER_BASE_URL;

  try {
    // Check if we have an authenticated request with a token
    if (!req.auth || !req.auth.token) {
      return res.status(401).json({ message: "No valid token found" });
    }

    const accessToken = req.auth.token;

    // Call Auth0 userinfo endpoint
    const response = await axios.get(`${issuer}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Attach the user info to the request object
    req.userInfo = response.data;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Failed to get user info:", error.message);
    return res.status(500).json({ message: "Failed to get user info" });
  }
};

export default getUserInfoMiddleware;

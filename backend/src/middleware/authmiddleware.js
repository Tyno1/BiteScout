import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  console.log("auth", req.cookies.token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(403).json({ error: "Invalid token." });
  }
};

export default authMiddleware;

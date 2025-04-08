import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  console.log("auth",req.headers.authorization);

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  console.log(token);

  try {
    // Verify token using the same secret as NextAuth
    // const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const decode = jwt.decode(token)
    console.log(decode);
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

export default authMiddleware;

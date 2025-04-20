import { User } from "../types/User";
import jwt, { JwtPayload } from "jsonwebtoken";

export type MyJWTPayload = JwtPayload & {
  userId: string;
  userType: string;
};

export const generateAccessToken = (user: User) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return token;
};

export const generateRefreshToken = (user: User) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email, userType: user.userType },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
  return token;
};

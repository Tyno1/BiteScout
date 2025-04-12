import { User } from "../types/User";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: User) => {
  const token = jwt.sign(
    { userId: user._id, userType: user.userType },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return token;
};

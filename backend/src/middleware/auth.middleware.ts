import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    (req as any).user = user;
    next();

  } catch (error: any) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

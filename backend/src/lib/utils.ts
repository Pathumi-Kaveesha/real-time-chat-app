import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: String, res: Response) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "9d" }
  );

  res.cookie("jwt", token, { 
    httpOnly: true, // prevent xss attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    maxAge: 9 * 24 * 60 * 60 * 1000 //MS
  });

  return token;
};

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateJWT = (jwtPayload: JwtPayload) => {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "10d" });
  return token;
};

export async function getUserFromToken(): Promise<JwtPayload | null> {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) return null;

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

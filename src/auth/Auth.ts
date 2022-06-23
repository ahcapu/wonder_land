import { sign, verify } from "jsonwebtoken";

export const signJwt = (id: number) => {
  return sign({ id }, process.env.JWT_SECRET as any, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const tokenVerification = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET as any);
};

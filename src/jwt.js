import jwt from "jsonwebtoken";

export const JWT_SECRET = "AXIOM_JWT_SINGLE_SECRET";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

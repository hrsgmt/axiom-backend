import jwt from "jsonwebtoken";

const JWT_SECRET = "axiom-super-secret-123"; // SAME EVERYWHERE

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

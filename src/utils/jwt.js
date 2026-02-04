import jwt from "jsonwebtoken";

const JWT_SECRET = "AXIOM_SUPER_SECRET_KEY_2026";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

import jwt from "jsonwebtoken";

const SECRET = "AXIOM_JWT_SINGLE_SECRET";

export function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verify(token) {
  return jwt.verify(token, SECRET);
}

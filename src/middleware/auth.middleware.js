import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret";

export async function authMiddleware(request, reply) {
  const auth = request.headers.authorization;
  if (!auth) {
    return reply.code(401).send({ error: "No token provided" });
  }

  const token = auth.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

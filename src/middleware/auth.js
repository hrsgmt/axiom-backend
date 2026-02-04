import jwt from "jsonwebtoken";

export default async function authMiddleware(request, reply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply.code(401).send({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "axiom-secret"
    );

    request.user = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

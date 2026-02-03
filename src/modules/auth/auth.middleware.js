import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret";

export function requireAuth(role = null) {
  return async (req, reply) => {
    const auth = req.headers.authorization;
    if (!auth) return reply.code(401).send({ error: "No token" });

    try {
      const token = auth.replace("Bearer ", "");
      const payload = jwt.verify(token, JWT_SECRET);
      if (role && payload.role !== role) {
        return reply.code(403).send({ error: "Forbidden" });
      }
      req.user = payload;
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  };
}

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret-key";

export default async function meRoutes(app) {
  app.get("/me", async (request, reply) => {
    const auth = request.headers.authorization;
    if (!auth) return reply.code(401).send({ error: "No token" });

    const token = auth.replace("Bearer ", "");

    try {
      const user = jwt.verify(token, JWT_SECRET);
      return { user };
    } catch {
      return reply.code(401).send({ error: "Invalid or expired token" });
    }
  });
}

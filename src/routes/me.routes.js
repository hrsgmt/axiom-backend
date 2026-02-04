import jwt from "jsonwebtoken";

export default async function meRoutes(app) {
  app.get("/me", async (request, reply) => {
    try {
      const auth = request.headers.authorization;
      if (!auth) {
        return reply.code(401).send({ error: "No token provided" });
      }

      const token = auth.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");

      // IMPORTANT: return ONLY safe fields
      return {
        user: {
          id: decoded.userId,
          email: decoded.email
        },
        message: "Protected route working ✅"
      };
    } catch (err) {
      return reply.code(401).send({ error: "Invalid or expired token" });
    }
  });
}

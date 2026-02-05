import jwt from "jsonwebtoken";

const SECRET = "AXIOM_JWT_SINGLE_SECRET";

export default async function meRoute(app) {
  app.get("/api/me", async (request, reply) => {
    try {
      const auth = request.headers.authorization;
      if (!auth) {
        return reply.code(401).send({ error: "Missing token" });
      }

      const token = auth.replace("Bearer ", "");
      const decoded = jwt.verify(token, SECRET);

      return {
        decoded,
        message: "JWT VERIFIED ✅"
      };
    } catch (e) {
      return reply.code(401).send({
        error: "Invalid or expired token",
        details: e.message
      });
    }
  });
}

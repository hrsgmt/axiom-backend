import { verify } from "../jwt.js";
import { findUserByEmail, safeUser } from "../store/users.js";

export default async function profileRoutes(app) {
  app.get("/profile", async (request, reply) => {
    try {
      const auth = request.headers.authorization;
      if (!auth) {
        return reply.code(401).send({ error: "Missing token" });
      }

      const token = auth.replace("Bearer ", "");
      const decoded = verify(token);

      const user = findUserByEmail(decoded.email);
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }

      return {
        profile: safeUser(user)
      };
    } catch (e) {
      return reply.code(401).send({
        error: "Invalid or expired token",
        details: e.message
      });
    }
  });
}

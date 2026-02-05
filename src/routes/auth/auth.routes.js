import { registerUser, loginUser } from "../../services/auth.service.js";

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    try {
      const { email, password } = request.body || {};
      if (!email || !password) {
        return reply.code(400).send({ error: "Email & password required" });
      }

      const user = await registerUser({ email, password });
      return { registered: true, user };

    } catch (e) {
      return reply.code(400).send({ error: e.message });
    }
  });

  app.post("/login", async (request, reply) => {
    try {
      const { email, password } = request.body || {};
      if (!email || !password) {
        return reply.code(400).send({ error: "Email & password required" });
      }

      const result = await loginUser({ email, password });
      return { login: true, ...result };

    } catch (e) {
      return reply.code(401).send({ error: e.message });
    }
  });

}

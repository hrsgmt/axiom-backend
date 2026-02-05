import Fastify from "fastify";
import loginRoute from "./routes/auth/login.js";
import { verify } from "./jwt.js";

const app = Fastify({ logger: true });

app.register(loginRoute, { prefix: "/api/auth" });

app.get("/api/me", async (request, reply) => {
  try {
    const auth = request.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ error: "Missing Authorization header" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = verify(token);

    return {
      decoded,
      message: "JWT VERIFIED ✅"
    };
  } catch (e) {
    return reply.code(401).send({
      error: "JWT VERIFY FAILED",
      details: e.message
    });
  }
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

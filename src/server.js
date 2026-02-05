import Fastify from "fastify";
import loginRoute from "./routes/auth/login.js";
import { verify } from "./jwt.js";

const app = Fastify();

app.register(loginRoute, { prefix: "/api/auth" });

app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.replace("Bearer ", "");
    const decoded = verify(token);

    return {
      decoded,
      message: "JWT VERIFIED INSIDE SERVER ✅"
    };
  } catch (e) {
    return reply.code(401).send({
      error: "JWT VERIFY FAILED",
      details: e.message
    });
  }
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import meRoute from "./routes/me.js";
import jwt from "@fastify/jwt";

const app = Fastify({ logger: true });

app.register(jwt, {
  secret: process.env.JWT_SECRET || "axiom-secret"
});

app.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Invalid or expired token" });
  }
});

app.register(authRoutes, { prefix: "/api/auth" });
app.register(meRoute, { prefix: "/api" });

app.get("/health", async () => ({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT, host: "0.0.0.0" });

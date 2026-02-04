import Fastify from "fastify";
import jwt from "@fastify/jwt";
import authRoutes from "./routes/auth/auth.routes.js";
import meRoutes from "./routes/me.routes.js";

const app = Fastify({ logger: true });

app.register(jwt, {
  secret: process.env.JWT_SECRET || "axiom-secret"
});

app.decorate("verifyJWT", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Invalid or expired token" });
  }
});

app.register(authRoutes, { prefix: "/api/auth" });
app.register(meRoutes, { prefix: "/api" });

app.get("/health", async () => ({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port " + PORT);
});

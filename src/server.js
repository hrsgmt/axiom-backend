import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import authRoutes from "./routes/auth/auth.routes.js";
import refreshRoute from "./routes/auth/refresh.js";
import meRoute from "./routes/me.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  credentials: true
});

await app.register(cookie);

/* AUTH */
await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(refreshRoute, { prefix: "/api/auth" });

/* ME */
await app.register(meRoute, { prefix: "/api" });

app.get("/", () => "Axiom backend running 🚀");

await app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

app.post("/__refresh_test__", async () => {
  return { ok: true };
});


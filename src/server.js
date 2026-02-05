import Fastify from "fastify";
import corsPlugin from "./plugins/cors.js";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = Fastify({ logger: true });

await app.register(corsPlugin);

await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(profileRoutes, { prefix: "/api" });

app.get("/", async () => {
  return "Axiom backend running 🚀";
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

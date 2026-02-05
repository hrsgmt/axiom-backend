import Fastify from "fastify";
import corsPlugin from "./plugins/cors.js";
import authRoutes from "./routes/auth/index.js";
import profileRoutes from "./routes/profile.js";

const app = Fastify({ logger: true });

await app.register(corsPlugin);
await app.register(authRoutes, { prefix: "/api/auth" });
import profileRoutes from "./routes/profile.js";
app.register(profileRoutes, { prefix: "/api" });

await app.register(profileRoutes, { prefix: "/api" });

app.get("/", () => ({
  status: "Axiom backend running 🚀",
  version: "v1"
}));

app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

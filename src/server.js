import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });

app.register(authRoutes, { prefix: "/api/auth" });

app.get("/health", async () => ({ status: "ok" }));

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import meRoute from "./routes/me.js";

const app = Fastify({ logger: true });

app.register(authRoutes, { prefix: "/api/auth" });
app.register(meRoute, { prefix: "/api" });

app.get("/health", async () => ({ status: "ok" }));

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

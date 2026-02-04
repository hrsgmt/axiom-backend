import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import meRoutes from "./routes/me.routes.js";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

app.register(authRoutes, { prefix: "/api/auth" });
app.register(meRoutes, { prefix: "/api" });

app.get("/health", async () => ({ status: "ok" }));

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port " + PORT);
});

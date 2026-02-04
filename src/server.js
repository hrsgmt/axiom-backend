import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

// register auth routes
app.register(authRoutes, { prefix: "/api/auth" });

// health check
app.get("/health", async () => {
  return { status: "ok" };
});

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port " + PORT);
});

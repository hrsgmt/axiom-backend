import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });

// CORS
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// AUTH ROUTES
app.register(authRoutes, { prefix: "/api/auth" });
import meRoutes from "./routes/me/me.routes.js";
app.register(meRoutes, { prefix: "/api" });

// DEBUG: list routes
app.ready(() => {
  console.log("=== ROUTES ===");
  console.log(app.printRoutes());
});

// HEALTH
app.get("/", async () => "Axiom backend running 🚀");

const PORT = process.env.PORT || 4000;
import meRoutes from "./routes/me/me.routes.js";

app.register(meRoutes, { prefix: "/api" });

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on", PORT);
});

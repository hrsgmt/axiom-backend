import Fastify from "fastify";
import cors from "@fastify/cors";

// ✅ AUTH ROUTES (ONLY ONE SOURCE)
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });

// CORS
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// ✅ REGISTER AUTH ROUTES
// This creates:
// POST /api/auth/register
// POST /api/auth/login
await app.register(authRoutes, { prefix: "/api/auth" });

// HEALTH
app.get("/", async () => {
  return "Axiom backend running 🚀";
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

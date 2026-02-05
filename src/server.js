import Fastify from "fastify";
import cors from "@fastify/cors";

// ROUTES
import authRoutes from "./modules/auth/auth.routes.js";

const app = Fastify({ logger: true });

// CORS
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// AUTH ROUTES → /api/auth/*
await app.register(authRoutes, { prefix: "/api/auth" });

// HEALTH
app.get("/", async () => {
  return "Axiom backend running 🚀";
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

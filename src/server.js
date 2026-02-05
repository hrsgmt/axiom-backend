import meRoute from "./routes/me.js";
import Fastify from "fastify";
import cors from "@fastify/cors";

import authRoutes from "./routes/auth/auth.routes.js";
import loginRoute from "./routes/auth/login.js";
import { verifyToken } from "./jwt.js";

const app = Fastify({ logger: true });

/* ---------- CORS ---------- */
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

/* ---------- AUTH ROUTES ---------- */
await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(loginRoute, { prefix: "/api/auth" });

/* ---------- PROTECTED ROUTE ---------- */
app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ error: "No token" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);

    return {
      user: decoded,
      message: "JWT VERIFIED ✅"
    };
  } catch (e) {
    return reply.code(401).send({
      error: "Invalid or expired token",
      details: e.message
    });
  }
});

/* ---------- HEALTH ---------- */
app.get("/", () => "Axiom backend running 🚀");

/* ---------- START SERVER ---------- */
app.register(meRoute);
app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

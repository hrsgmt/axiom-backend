import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/index.js";
import { verify } from "./jwt.js";

const app = Fastify({ logger: true });

// ✅ ABSOLUTE CORS FIX (browser-safe)
await app.register(cors, {
  origin: true, // allow all origins
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// Auth routes
app.register(authRoutes, { prefix: "/api/auth" });

// Protected route
app.get("/api/me", async (request, reply) => {
  try {
    const auth = request.headers.authorization;
    if (!auth) throw new Error("No auth header");

    const token = auth.replace("Bearer ", "");
    const decoded = verify(token);

    return { user: decoded };
  } catch {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
});

// Health
app.get("/", () => "Axiom backend running 🚀");

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

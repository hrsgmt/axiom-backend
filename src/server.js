import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/index.js";
import { verify } from "./jwt.js";

const app = Fastify({ logger: true });

// ✅ CORS (browser access)
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// Routes
app.register(authRoutes, { prefix: "/api/auth" });

// Protected route
app.get("/api/me", async (request, reply) => {
  try {
    const auth = request.headers.authorization;
    if (!auth) throw new Error("Missing Authorization header");

    const token = auth.replace("Bearer ", "");
    const decoded = verify(token);

    return {
      decoded,
      message: "JWT VERIFIED ✅"
    };
  } catch (e) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
});

// Health
app.get("/", () => "Axiom backend running 🚀");

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

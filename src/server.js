import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/auth.routes.js";
import jwt from "./jwt.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: [
    "https://axiom-frontend-l53b.onrender.com",
    "https://hrsgmt.github.io"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

app.get("/", async () => {
  return { status: "Axiom backend running 🚀" };
});

app.register(authRoutes, { prefix: "/api/auth" });

app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("No token");

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token);

    return { decoded, message: "JWT VERIFIED ✅" };
  } catch (e) {
    return reply.code(401).send({ error: "Invalid token" });
  }
});

app.listen({ port: 4000, host: "0.0.0.0" });

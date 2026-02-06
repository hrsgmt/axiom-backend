import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/auth.routes.js";
import jwt from "jsonwebtoken";

const app = Fastify({ logger: true });

/* ✅ CORS MUST BE FIRST */
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

/* JWT VERIFY */
const SECRET = "AXIOM_JWT_SINGLE_SECRET";

app.decorate("verifyJWT", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Missing token");

    const token = auth.replace("Bearer ", "");
    req.user = jwt.verify(token, SECRET);
  } catch (e) {
    reply.code(401).send({ error: "Invalid or expired token" });
  }
});

/* ROUTES */
await app.register(authRoutes, { prefix: "/api/auth" });

app.get("/api/me", {
  preHandler: app.verifyJWT
}, async (req) => {
  return {
    decoded: req.user,
    message: "JWT VERIFIED ✅"
  };
});

/* HEALTH */
app.get("/", async () => "Axiom backend running 🚀");

/* START */
app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "jsonwebtoken";

const app = Fastify({ logger: true });
const SECRET = "AXIOM_JWT_SINGLE_SECRET";

/* CORS — HARD ENABLE */
await app.register(cors, {
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
});

/* FORCE OPTIONS (PRE-FLIGHT) */
app.options("*", async (req, reply) => {
  reply
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    .send();
});

/* AUTH */
app.post("/api/auth/login", async (req, reply) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return reply.code(400).send({ error: "Missing credentials" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "7d" });
  return { login: true, token };
});

/* ME */
app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("no token");

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET);
    return { decoded, message: "JWT VERIFIED ✅" };
  } catch {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
});

/* HEALTH */
app.get("/", async () => "Axiom backend running 🚀");

/* START SERVER */
app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

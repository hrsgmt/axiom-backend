import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "jsonwebtoken";

const app = Fastify({ logger: true });

/* =========================
   CORS — THIS FIXES EVERYTHING
========================= */
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

/* =========================
   JWT
========================= */
const SECRET = "AXIOM_JWT_SINGLE_SECRET";

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

/* =========================
   AUTH ROUTES
========================= */
app.post("/api/auth/login", async (req, reply) => {
  const { email, password } = req.body || {};

  if (!email) {
    return reply.code(400).send({ error: "Email required" });
  }

  const token = sign({
    email,
    issued: "login-route"
  });

  return { login: true, token };
});

/* =========================
   PROTECTED ROUTE
========================= */
app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("No auth header");

    const token = auth.replace("Bearer ", "");
    const decoded = verify(token);

    return {
      decoded,
      message: "JWT VERIFIED ✅"
    };
  } catch (e) {
    return reply.code(401).send({
      error: "Invalid or expired token"
    });
  }
});

/* =========================
   HEALTH
========================= */
app.get("/", () => "Axiom backend running 🚀");

app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

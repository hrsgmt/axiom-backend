import corsPlugin from "./plugins/cors.js";

import Fastify from "fastify";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = Fastify({ logger: true });

const JWT_SECRET = "AXIOM_JWT_SINGLE_SECRET";

// In-memory users
const users = new Map();

/* ---------------- AUTH REGISTER ---------------- */
app.post("/api/auth/register", async (req, reply) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return reply.code(400).send({ error: "Email and password required" });
  }

  if (users.has(email)) {
    return reply.code(400).send({ error: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: crypto.randomUUID(), email, passwordHash };
  users.set(email, user);

  return { registered: true, email };
});

/* ---------------- AUTH LOGIN ---------------- */
app.post("/api/auth/login", async (req, reply) => {
  const { email, password } = req.body || {};
  const user = users.get(email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return reply.code(401).send({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { login: true, token };
});

/* ---------------- ME (JWT VERIFY) ---------------- */
app.get("/api/me", async (req, reply) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ error: "Missing token" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);

    return {
      decoded,
      message: "JWT VERIFIED ✅"
    };
  } catch (e) {
    return reply.code(401).send({
      error: "Invalid or expired token",
      details: e.message
    });
  }
});

/* ---------------- HEALTH ---------------- */
app.get("/", () => "Axiom backend running 🚀");

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

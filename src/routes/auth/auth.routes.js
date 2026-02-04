import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../../stores/users.store.js";

const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret";

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return reply.code(409).send({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({ email, passwordHash });

    return { registered: true, userId: user.id };
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};
    const user = getUserByEmail(email);

    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { login: true, token };
  });
}

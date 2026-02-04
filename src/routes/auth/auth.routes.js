import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "axiom_secret_key";

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return {
      registered: true,
      email,
      password: hashedPassword
    };
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    // demo-only (no DB yet)
    const fakeHashed = await bcrypt.hash("123456", 10);
    const match = await bcrypt.compare(password, fakeHashed);

    if (!match) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    return {
      login: true,
      token
    };
  });
}

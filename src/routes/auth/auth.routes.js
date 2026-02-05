import bcrypt from "bcryptjs";
import { signToken } from "../../utils/jwt.js";

export default async function authRoutes(app) {

  // DEV RESET REGISTER (ALWAYS WORKS)
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email & password required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      createdAt: Date.now()
    };

    app.db.users.set(email, user);

    return { registered: true, email };
  });

  // LOGIN (MATCHES REGISTER ABOVE)
  app.post("/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = app.db.users.get(email);

    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = signToken({
      userId: user.id,
      email: user.email
    });

    return { login: true, token };
  });
}

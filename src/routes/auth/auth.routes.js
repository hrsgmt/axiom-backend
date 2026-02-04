import bcrypt from "bcryptjs";
import { signToken } from "../../utils/jwt.js";

const users = [];

export default async function authRoutes(app) {

  app.post("/register", async (req) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    users.push({ id: crypto.randomUUID(), email, passwordHash });
    return { registered: true };
  });

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return reply.code(401).send({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return reply.code(401).send({ error: "Invalid credentials" });

    const token = signToken({ userId: user.id, email: user.email });
    return { login: true, token };
  });
}

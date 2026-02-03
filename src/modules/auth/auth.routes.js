import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret";

export async function authRoutes(app) {

  app.post('/auth/register', async (req, reply) => {
    const { email, password, role = "user" } = req.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Missing fields" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, email, password: hash, role };
    users.push(user);

    return reply.send({ id: user.id, email, role });
  });

  app.post('/auth/login', async (req, reply) => {
    const { email, password } = req.body || {};
    const user = users.find(u => u.email === email);
    if (!user) return reply.code(401).send({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return reply.code(401).send({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return reply.send({ token });
  });
}

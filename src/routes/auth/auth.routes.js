import bcrypt from "bcryptjs";
import { signToken } from "../../utils/jwt.js";

const users = [];

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: crypto.randomUUID(),
      email,
      passwordHash
    };

    users.push(user);

    return { registered: true, userId: user.id };
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = signToken({
      userId: user.id,
      email: user.email
    });

    return { login: true, token };
  });
}

import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { signToken } from "../../utils/jwt.js";

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const exists = app.users.find(u => u.email === email);
    if (exists) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: Date.now()
    };

    app.users.push(user);

    return {
      registered: true,
      userId: user.id
    };
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};

    const user = app.users.find(u => u.email === email);
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

    return {
      login: true,
      token
    };
  });

}

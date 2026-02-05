import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, safeUser } from "../../store/users.js";
import { signToken } from "../../jwt.js";

export default async function authRoutes(app) {

  app.post("/register", async (req, reply) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    if (findUserByEmail(email)) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({ email, passwordHash });

    return { registered: true, user: safeUser(user) };
  });

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user.id, email: user.email });

    return { login: true, token };
  });
}

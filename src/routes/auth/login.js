import { findUserByEmail } from "../../store/users.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../jwt.js";

export default async function loginRoute(app) {
  app.post("/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      issued: "login-route"
    });

    return { login: true, token };
  });
}

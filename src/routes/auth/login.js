import { signAccess, signRefresh } from "../../jwt.js";
import { findUserByEmail } from "../../store/users.js";
import bcrypt from "bcryptjs";

export default async function loginRoute(app) {
  app.post("/api/auth/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const accessToken = signAccess({ id: user.id, email: user.email });
    const refreshToken = signRefresh({ id: user.id });

    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/api/auth/refresh"
    });

    return { accessToken };
  });
}

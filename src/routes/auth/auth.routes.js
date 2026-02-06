import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../../store/users.js";

const ACCESS_SECRET = "AXIOM_ACCESS_SECRET";
const REFRESH_SECRET = "AXIOM_REFRESH_SECRET";

export default async function authRoutes(app) {

  // REGISTER
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    if (findUserByEmail(email)) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    createUser({ email, passwordHash });

    return { registered: true };
  });

  // LOGIN
  app.post("/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/api/auth/refresh"
    });

    return { login: true, token: accessToken };
  });

  // REFRESH ✅
  app.post("/refresh", async (req, reply) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      return reply.code(401).send({ error: "No refresh token" });
    }

    try {
      const decoded = jwt.verify(token, REFRESH_SECRET);

      const newAccessToken = jwt.sign(
        { id: decoded.id },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      return { token: newAccessToken };
    } catch {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

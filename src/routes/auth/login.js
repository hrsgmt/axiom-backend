import bcrypt from "bcryptjs";
import { findUserByEmail } from "../../store/users.js";
import { signAccess, signRefresh } from "../../jwt.js";
import { saveRefreshToken } from "../../store/refreshTokens.js";

export default async function login(app) {
  app.post("/login", async (req, reply) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const accessToken = signAccess({ id: user.id, email });
    const refreshToken = signRefresh({ id: user.id });

    saveRefreshToken(refreshToken, user.id);

    return { accessToken, refreshToken };
  });
}

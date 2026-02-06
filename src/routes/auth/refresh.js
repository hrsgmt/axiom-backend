import { verifyRefresh, signAccess } from "../../jwt.js";

export default async function refreshRoute(app) {
  app.post("/api/auth/refresh", async (req, reply) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      return reply.code(401).send({ error: "No refresh token" });
    }

    try {
      const payload = verifyRefresh(token);
      const accessToken = signAccess({
        id: payload.id,
        email: payload.email
      });

      return { accessToken };
    } catch {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

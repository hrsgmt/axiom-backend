import { verifyRefresh, signAccess } from "../../jwt.js";

export default async function refreshRoute(app) {
  app.post("/api/auth/refresh", async (req, reply) => {
    const token = req.cookies.refreshToken;
    if (!token) return reply.code(401).send({ error: "No refresh token" });

    try {
      const payload = verifyRefresh(token);
      const newAccess = signAccess({ id: payload.id });
      return { accessToken: newAccess };
    } catch {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

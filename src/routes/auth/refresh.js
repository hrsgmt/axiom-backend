import { verifyRefresh, signAccess } from "../../jwt.js";
import { getUserIdByRefresh } from "../../store/refreshTokens.js";

export default async function refresh(app) {
  app.post("/refresh", async (req, reply) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return reply.code(401).send({ error: "No token" });

    const decoded = verifyRefresh(refreshToken);
    const userId = getUserIdByRefresh(refreshToken);

    if (!userId) return reply.code(401).send({ error: "Invalid refresh" });

    const accessToken = signAccess({ id: userId });
    return { accessToken };
  });
}

import { signToken, verifyToken } from "../../jwt.js";

export default async function refreshRoute(app) {
  app.post("/refresh", async (req, reply) => {
    try {
      const token =
        req.cookies?.refreshToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return reply.code(401).send({ error: "No refresh token" });
      }

      const decoded = verifyToken(token);

      const newToken = signToken({
        id: decoded.id,
        email: decoded.email
      });

      return { token: newToken };
    } catch (e) {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

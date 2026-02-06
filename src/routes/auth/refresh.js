import jwt from "jsonwebtoken";

export default async function refreshRoute(app) {
  app.post("/refresh", async (req, reply) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return reply.code(401).send({ error: "No refresh token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");

      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET || "dev-secret",
        { expiresIn: "15m" }
      );

      return { accessToken };
    } catch {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "AXIOM_JWT_SINGLE_SECRET";

export default async function refreshRoute(app) {
  app.post("/refresh", async (req, reply) => {
    try {
      const refresh = req.cookies?.refresh;

      if (!refresh) {
        return reply.code(401).send({ error: "No refresh token" });
      }

      const decoded = jwt.verify(refresh, SECRET);

      const token = jwt.sign(
        { id: decoded.id, email: decoded.email },
        SECRET,
        { expiresIn: "1h" }
      );

      return { token };
    } catch (e) {
      return reply.code(401).send({ error: "Invalid refresh token" });
    }
  });
}

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "axiom-secret";

export default async function authRoutes(app) {

  app.post("/register", async (request, reply) => {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }
    return { registered: true, email };
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      login: true,
      email,
      token
    };
  });

}

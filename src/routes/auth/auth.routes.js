export default async function authRoutes(app) {

  // REGISTER
  app.post("/register", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({
        error: "Email and password required"
      });
    }

    return {
      registered: true,
      email
    };
  });

  // LOGIN
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({
        error: "Email and password required"
      });
    }

    return {
      login: true,
      email,
      token: "demo-jwt-token"
    };
  });

}

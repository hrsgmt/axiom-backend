export default async function authRoutes(app) {

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

}

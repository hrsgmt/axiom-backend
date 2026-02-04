export default async function meRoutes(app) {
  app.get("/me", { preHandler: app.verifyJWT }, async (request) => {
    const { passwordHash, ...safeUser } = request.user;
    return {
      user: safeUser,
      message: "Protected route working ✅"
    };
  });
}

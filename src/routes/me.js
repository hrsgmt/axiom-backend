export default async function meRoute(app) {
  app.get("/me", { preHandler: app.authenticate }, async (request) => {
    const { passwordHash, ...safeUser } = request.user;
    return {
      user: safeUser,
      message: "Protected route working ✅"
    };
  });
}

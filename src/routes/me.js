import verifyJWT from "../middlewares/verifyJWT.js";

export default async function meRoute(app) {
  app.get("/api/me", { preHandler: verifyJWT }, async (request) => {
    return {
      user: request.user,
      message: "Protected route working ✅"
    };
  });
}

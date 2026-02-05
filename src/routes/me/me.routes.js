import verifyJWT from "../../middlewares/verifyJWT.js";

export default async function meRoutes(app) {
  app.get("/me", { preHandler: verifyJWT }, async (request) => {
    return {
      user: request.user,
      message: "JWT VERIFIED ✅"
    };
  });
}

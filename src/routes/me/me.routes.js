import { verifyJwt } from "../../middleware/verifyJwt.js";

export default async function meRoutes(app) {
  app.get("/me", { preHandler: verifyJwt }, async (req) => {
    return {
      user: req.user,
      message: "JWT VERIFIED ✅"
    };
  });
}

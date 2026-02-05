import verifyJWT from "../middlewares/verifyJWT.js";
import { findUserByEmail, safeUser } from "../store/users.js";

export default async function meRoute(app) {
  app.get("/me", { preHandler: verifyJWT }, async (req) => {
    const user = findUserByEmail(req.user.email);
    return { user: safeUser(user) };
  });
}

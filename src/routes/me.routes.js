import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserById } from "../stores/users.store.js";

export default async function meRoutes(app) {
  app.get("/me", { preHandler: authMiddleware }, async (request) => {
    const user = getUserById(request.user.userId);
    return { user };
  });
}

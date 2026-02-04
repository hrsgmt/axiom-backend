import authMiddleware from "../../middleware/auth.js";

export default async function protectedRoutes(app) {
  app.get(
    "/me",
    { preHandler: authMiddleware },
    async (request) => {
      return {
        user: request.user,
        message: "Protected route working ✅"
      };
    }
  );
}

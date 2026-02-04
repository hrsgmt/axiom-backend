import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import verifyJWT from "./middlewares/verifyJWT.js";

const app = Fastify({ logger: true });

app.register(authRoutes, { prefix: "/api/auth" });

app.get("/api/me", { preHandler: verifyJWT }, async (request) => {
  return {
    user: request.user,
    message: "Protected route working ✅"
  };
});

app.get("/health", async () => ({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT, host: "0.0.0.0" });

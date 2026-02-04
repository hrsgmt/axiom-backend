import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import verifyJWT from "./middlewares/verifyJWT.js";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

/* TEMP MEMORY DB */
app.users = [];

/* ROUTES */
app.register(authRoutes, { prefix: "/api/auth" });

app.get("/api/me", { preHandler: verifyJWT }, async (request) => {
  const { passwordHash, ...safeUser } = request.user;
  return {
    user: safeUser,
    message: "Protected route working ✅"
  };
});

app.get("/health", async () => {
  return { status: "ok" };
});

app.listen({ port: PORT, host: "0.0.0.0" });

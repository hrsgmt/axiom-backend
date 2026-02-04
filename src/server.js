import Fastify from "fastify";
import authRoutes from "./routes/auth/auth.routes.js";
import meRoute from "./routes/me.js";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

app.register(authRoutes, { prefix: "/api/auth" });
app.register(meRoute);

app.listen({ port: PORT, host: "0.0.0.0" });

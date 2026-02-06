import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import loginRoute from "./routes/auth/login.js";
import refreshRoute from "./routes/auth/refresh.js";

const app = Fastify();

await app.register(cors, {
  origin: true,
  credentials: true
});

await app.register(cookie);

// ROUTES
await loginRoute(app);
await refreshRoute(app);

// HEALTH
app.get("/", async () => "Axiom backend running 🚀");

app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

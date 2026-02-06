import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth/auth.routes.js";
import jwt from "./jwt.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  credentials: true
});

/* 🔥 HARD FORCE OPTIONS */
app.options("*", async (req, reply) => {
  reply
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    .code(204)
    .send();
});

/* CORS HEADERS FOR ALL */
app.addHook("onSend", async (req, reply, payload) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  reply.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  return payload;
});

app.register(authRoutes, { prefix: "/api/auth" });

app.get("/api/me", async (req, reply) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token);
    return { decoded, message: "JWT VERIFIED ✅" };
  } catch {
    return reply.code(401).send({ error: "Invalid token" });
  }
});

app.get("/", async () => ({ status: "OK" }));

app.listen({ port: 4000, host: "0.0.0.0" });

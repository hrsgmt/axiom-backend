import Fastify from "fastify";

const app = Fastify();

app.get("/", () => {
  return "🚨 THIS IS src/server.js 🚨";
});

app.get("/health", () => {
  return { ok: true };
});

app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });

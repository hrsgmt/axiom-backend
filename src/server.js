import Fastify from "fastify";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

/* Root */
app.get("/", async () => {
  return "Axiom backend running 🚀";
});

/* Health check */
app.get("/health", async () => {
  return { status: "ok", uptime: process.uptime() };
});

/* Keep-alive ping */
app.get("/ping", async () => {
  return { pong: true, time: Date.now() };
});

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port " + PORT);
});

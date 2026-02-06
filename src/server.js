import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
  return { status: "OK", source: "server.js", time: Date.now() };
});

await app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});

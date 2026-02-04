import Fastify from "fastify";

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

app.get("/", async () => {
  return "Axiom backend running 🚀";
});

app.get("/health", async () => {
  return { status: "ok" };
});

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port " + PORT);
});

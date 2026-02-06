import cors from "@fastify/cors";

export default async function corsPlugin(app) {
  await app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  });
}

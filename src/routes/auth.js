export default async function authRoutes(app) {
  app.get("/ping", async () => {
    return { auth: "alive" };
  });
}

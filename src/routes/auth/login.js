import { sign } from "../../jwt.js";

export default async function loginRoute(app) {
  app.post("/login", async (request, reply) => {
    const body = request.body || {};
    const email = body.email || "debug@axiom.ai";

    const token = sign({
      email,
      issued: "login-route"
    });

    return {
      login: true,
      token
    };
  });
}

import { sign } from "../../jwt.js";

export default async function loginRoute(app) {
  app.post("/login", async (req) => {
    const { email } = req.body;

    const token = sign({
      email,
      debug: "signed-by-server"
    });

    return { login: true, token };
  });
}

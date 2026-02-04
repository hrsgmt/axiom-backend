import bcrypt from "bcryptjs";

export default async function authRoutes(app) {
  // TEMP in-memory users (will replace with DB later)
  const users = [];

  // REGISTER
  app.post("/auth/register", async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });

    return { success: true, message: "User registered" };
  });

  // LOGIN
  app.post("/auth/login", async (request, reply) => {
    const { email, password } = request.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    return { success: true, message: "Login successful" };
  });
}

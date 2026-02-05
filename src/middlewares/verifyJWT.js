import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "AXIOM_JWT_SINGLE_SECRET";

export default async function verifyJWT(request, reply) {
  try {
    const auth = request.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "Missing token" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET);

    request.user = decoded;
  } catch (e) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

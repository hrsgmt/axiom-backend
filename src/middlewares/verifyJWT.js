import { verifyToken } from "../jwt.js";

export default async function verifyJWT(request, reply) {
  try {
    const auth = request.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ error: "Missing Authorization header" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);

    request.user = decoded;
  } catch (e) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

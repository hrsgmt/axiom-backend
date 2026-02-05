import jwt from "jsonwebtoken";

const SECRET = "AXIOM_JWT_SINGLE_SECRET";

export function verifyJwt(request, reply, done) {
  try {
    const auth = request.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ error: "No token provided" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET);
    request.user = decoded;
    done();
  } catch (e) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

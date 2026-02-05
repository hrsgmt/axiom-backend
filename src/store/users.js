import { randomUUID } from "crypto";

const users = new Map();

export function createUser({ email, passwordHash }) {
  const user = {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: Date.now()
  };
  users.set(email, user);
  return user;
}

export function findUserByEmail(email) {
  return users.get(email);
}

export function safeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

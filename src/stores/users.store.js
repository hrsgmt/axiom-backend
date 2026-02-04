import { randomUUID } from "crypto";

const users = new Map();

export function createUser({ email, passwordHash }) {
  const user = {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: Date.now(),
  };
  users.set(user.id, user);
  return user;
}

export function getUserByEmail(email) {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export function getUserById(id) {
  return users.get(id) || null;
}

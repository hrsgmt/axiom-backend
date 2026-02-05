import { randomUUID } from "crypto";

const users = new Map();

/**
 * Create user
 */
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

/**
 * Find user by email
 */
export function findUserByEmail(email) {
  return users.get(email);
}

/**
 * Public-safe user (no password)
 */
export function safeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

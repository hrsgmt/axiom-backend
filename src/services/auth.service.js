import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, safeUser } from "../store/users.js";
import { sign } from "../jwt.js";

/**
 * Register user
 */
export async function registerUser({ email, password }) {
  const existing = findUserByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ email, passwordHash });

  return safeUser(user);
}

/**
 * Login user
 */
export async function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new Error("Invalid credentials");
  }

  const token = sign({ userId: user.id, email: user.email });

  return { token, user: safeUser(user) };
}

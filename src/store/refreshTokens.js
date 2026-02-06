const tokens = new Map();

export function saveRefreshToken(token, userId) {
  tokens.set(token, userId);
}

export function getUserIdByRefresh(token) {
  return tokens.get(token);
}

export function deleteRefreshToken(token) {
  tokens.delete(token);
}

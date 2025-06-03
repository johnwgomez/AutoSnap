// client/src/utils/auth.js

// Key under which we store the JWT
const TOKEN_STORAGE_KEY = 'id_token';

/**
 * Save the JWT into localStorage
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

/**
 * Retrieve the JWT from localStorage
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Remove the JWT from localStorage (logout)
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Check if a token exists in localStorage
 * Optionally, you could decode and inspect expiration here,
 * but for now, this simply returns a boolean.
 * @returns {boolean}
 */
export function isLoggedIn() {
  return Boolean(getToken());
}

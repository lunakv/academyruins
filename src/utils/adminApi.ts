const STORAGE_KEY = "adminCredentials";

export class AdminAuthError extends Error {
  constructor() {
    super("Admin credentials are missing or incorrect. Log in on the admin page.");
  }
}

export function getAdminCredentials(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAdminCredentials(user: string, password: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, btoa(`${user}:${password}`));
  } catch {
    // storage unavailable, credentials won't persist
  }
}

export function clearAdminCredentials() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// fetch from an admin endpoint, throwing on any non-OK response
export async function adminFetch(path: string, init: RequestInit = {}, credentials = getAdminCredentials()) {
  if (!credentials) throw new AdminAuthError();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Basic ${credentials}`);
  if (init.body) headers.set("Content-Type", "application/json");

  const resp = await fetch(`${process.env.REACT_APP_API_URL}${path}`, { ...init, headers });
  if (resp.status === 401) {
    clearAdminCredentials();
    throw new AdminAuthError();
  }
  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const detail = typeof json.detail === "string" ? json.detail : JSON.stringify(json.detail ?? json);
    throw new Error(`${resp.status}: ${detail}`);
  }
  return json;
}

const CLIENT_ACCESS_TOKEN_KEY = "petnova-client-access-token";
const CLIENT_DATA_KEY = "petnova-client-data";

export type ClientSessionUser = {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  documentId?: string | null;
  address?: string | null;
  isActive: boolean;
};

export function setClientSession(accessToken: string, client: ClientSessionUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CLIENT_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(CLIENT_DATA_KEY, JSON.stringify(client));
}

export function getClientAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CLIENT_ACCESS_TOKEN_KEY);
}

export function getClientSessionUser(): ClientSessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CLIENT_DATA_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ClientSessionUser;
  } catch {
    return null;
  }
}

export function clearClientSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CLIENT_ACCESS_TOKEN_KEY);
  localStorage.removeItem(CLIENT_DATA_KEY);
}

export function getClientAuthHeaders() {
  const token = getClientAccessToken();

  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
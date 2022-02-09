import { SESSION_KEY } from "config/auth";

export const setSession = (data) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getAccessToken = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (session) return session["access-token"];
};

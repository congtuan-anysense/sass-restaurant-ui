import { SESSION_KEY } from "config/app";
import { TENANT_HEADER_KEY } from "config/api";

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

export const getHeaders = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (session) {
    return {
      "access-token": session["access-token"],
      uid: session["uid"],
      client: session["client"],
      [TENANT_HEADER_KEY]: session[TENANT_HEADER_KEY],
    };
  }
};

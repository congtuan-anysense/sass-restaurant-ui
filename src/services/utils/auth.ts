import { SESSION_KEY } from "config/app";
import { LOGIN_HEADER_KEY } from "config/auth";

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
      [LOGIN_HEADER_KEY]: session[LOGIN_HEADER_KEY],
    };
  }
};

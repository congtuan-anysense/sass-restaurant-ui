import { lazy } from "react";

const Login = lazy(() => import("containers/auth/Login"));
const Register = lazy(() => import("containers/auth/Register"));

export const PUBLIC_ROUTES = {
  login: {
    path: "/login",
    component: Login,
  },
  register: {
    path: "/register",
    component: Register,
  },
};

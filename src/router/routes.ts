import { lazy } from "react";

// public containers
const Login = lazy(() => import("containers/auth/Login"));
const Register = lazy(() => import("containers/auth/Register"));

// protected containers
const Home = lazy(() => import("containers/Home"));

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

export const PROTECTED_ROUTES = {
  home: {
    path: "/",
    component: Home,
  },
};

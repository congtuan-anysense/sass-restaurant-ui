import axios from "axios";
import { LOGIN_HEADER_KEY } from "config/auth";
import { BASE_URL } from "config/app";
import { RegisterPayload } from "./type";

export const loginAPI = (
  email: string,
  password: string,
  restaurant: string
) => {
  const data = { email, password };
  return axios.post(`${BASE_URL}/users/auth/sign_in`, data, {
    headers: {
      [LOGIN_HEADER_KEY]: restaurant,
    },
  });
};

export const registerAPI = (data: RegisterPayload) => {
  const payload = { account: data };
  return axios.post(`${BASE_URL}/accounts`, payload);
};

import axios from "axios";
import { TENANT_HEADER_KEY } from "config/api";
import { BASE_URL } from "config/api";
import { RegisterPayload } from "./type";

export const loginAPI = (
  email: string,
  password: string,
  restaurant: string
) => {
  const data = { email, password };
  return axios.post(`${BASE_URL}/users/auth/sign_in`, data, {
    headers: {
      [TENANT_HEADER_KEY]: restaurant,
    },
  });
};

export const registerAPI = (data: RegisterPayload) => {
  const payload = { account: data };
  return axios.post(`${BASE_URL}/accounts`, payload);
};

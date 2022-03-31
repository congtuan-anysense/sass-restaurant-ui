import axios from "axios";
import { BASE_URL } from "config/api";
import { getHeaders, getSession } from "services/utils/auth";

export const getRestaurantSettingAPI = () => {
  const accountId = getSession()["account_id"];
  return axios.get(`${BASE_URL}/restaurant_settings/${accountId}`, {
    headers: getHeaders(),
  });
};

export const createRestaurantSettingAPI = (data) => {
  const accountId = getSession()["account_id"];
  return axios.post(`${BASE_URL}/restaurant_settings/${accountId}`, data, {
    headers: getHeaders(),
  });
};

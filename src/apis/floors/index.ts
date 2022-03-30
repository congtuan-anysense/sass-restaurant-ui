import axios from "axios";
import { BASE_URL } from "config/api";
import { getHeaders } from "services/utils/auth";

export const getFloorDetailAPI = (id) => {
  return axios.get(`${BASE_URL}/floors/${id}`, {
    headers: getHeaders(),
  });
};

export const createFloorAPI = (data) => {
  return axios.post(`${BASE_URL}/floors`, data, {
    headers: getHeaders(),
  });
};

export const updateFloorAPI = (id, data) => {
  return axios.put(`${BASE_URL}/floors/${id}`, data, {
    headers: getHeaders(),
  });
};

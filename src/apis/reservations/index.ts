import axios from "axios";
import { BASE_URL } from "config/api";
import { getHeaders } from "services/utils/auth";

export const getReservationsAPI = (date: string = null) => {
  return axios.get(`${BASE_URL}/reservations`, {
    headers: getHeaders(),
    params: { date: date },
  });
};

export const getAllTablesAPI = () => {
  return axios.get(`${BASE_URL}/tables`, {
    headers: getHeaders(),
  });
};

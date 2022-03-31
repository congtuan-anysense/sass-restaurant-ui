import axios from "axios";
import { BASE_URL } from "config/api";
import { getHeaders } from "services/utils/auth";

export const getReservationsAPI = (date: Date = null) => {
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return axios.get(`${BASE_URL}/reservations`, {
    headers: getHeaders(),
    params: { reserved_at: dateStr },
  });
};

export const getAllTablesAPI = () => {
  return axios.get(`${BASE_URL}/tables`, {
    headers: getHeaders(),
  });
};

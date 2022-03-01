import axios from "axios";
import { BASE_URL } from "config/api";
import { getHeaders } from "services/utils/auth";
import { ListCustomerPayload } from "./type";

export const getCustomersAPI = (data: ListCustomerPayload) => {
  return axios.get(`${BASE_URL}/customers`, {
    headers: getHeaders(),
    params: data,
  });
};

export const getCustomerAPI = (id: number) => {
  return axios.get(`${BASE_URL}/customers/${id}`, {
    headers: getHeaders(),
  });
};

export const createCustomerAPI = (data) => {
  return axios.post(`${BASE_URL}/customers`, data, {
    headers: getHeaders(),
  });
};

export const editCustomerAPI = (id, data) => {
  return axios.put(`${BASE_URL}/customers/${id}`, data, {
    headers: getHeaders(),
  });
};

export const deleteCustomerAPI = (id) => {
  return axios.delete(`${BASE_URL}/customers/${id}`, {
    headers: getHeaders(),
  });
};

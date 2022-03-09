import axios from "axios";
import { BASE_URL } from "config/api";

export const getPrefecturesAPI = () => {
  return axios.get(`${BASE_URL}/prefectures`);
};

export const getZipcodeDetailAPI = (zipcodeId: string) => {
  return axios.get(`${BASE_URL}/zipcodes/${zipcodeId}`);
};

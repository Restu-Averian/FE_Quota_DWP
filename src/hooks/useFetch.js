import axios from "axios";
import { API_URL } from "../constants";

const useFetch = () => {
  /**
   *  @param {import("axios").AxiosRequestConfig} config
   *  @param {"customer" | "transaction" | "quota"} endpoint
   *
   */
  return (config, endpoint) => {
    return axios({
      url: `${API_URL}/${endpoint}`,
      ...config,
    });
  };
};

export default useFetch;

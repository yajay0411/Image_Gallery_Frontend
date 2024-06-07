import { Axios } from "../axios";
import { CreateAxiosDefaults } from "axios";
import configuration from "../../config/config";

import { enqueueSnackbar } from "notistack";
import getCookie from "../../utils/GetCookie";
import removeCookie from "../../utils/RemoveCookie";

export class APIService extends Axios {
  static _instance: APIService | null = null;

  constructor(configuration: CreateAxiosDefaults<unknown>) {
    super(configuration);
    this._axiosInstance.interceptors.request.use(
      (config) => {
        const access_token = getCookie("access_token");
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token || ""}`;
        }
        return config;
      },
      (error) => {
        console.log(error);
        // handling error
      }
    );

    this._axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 403 || err?.response?.status === 401) {
          enqueueSnackbar("Session Expired", {
            variant: "error",
          });
          removeCookie("access_token");
          removeCookie("refresh_token");
          window.location.href = "/";
        } else if (err?.response?.status === 400) {
          enqueueSnackbar(err?.message?.message, {
            variant: "error",
          });
          if (err?.response?.data?.message) {
            enqueueSnackbar(err?.response?.data?.message, {
              variant: "error",
            });
          } else if (err?.response?.data) {
            enqueueSnackbar(err.response.data, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          }
        } else if (err?.response?.status === 404) {
          if (err?.response?.data?.message) {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          } else if (err?.response?.data) {
            enqueueSnackbar(err.response.data, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(err?.message, {
              variant: "error",
            });
          }
        } else if (err?.response?.status == 500) {
          throw err;
        }
      }
    );
  }

  static get Instance() {
    if (this._instance) {
      return this._instance;
    }

    const config = {
      baseURL: configuration.backend_endpoint,
    };

    // this._instance = new APIService(config);
    this._instance = new this(config);
    return this._instance;
  }

  get = (url: string, config = {}) => {
    return this._axiosInstance.get(url, config);
  };

  post = (url: string, data = {}, config = {}) => {
    return this._axiosInstance.post(url, data, config);
  };

  put = (url: string, data = {}, config = {}) => {
    return this._axiosInstance.put(url, data, config);
  };

  delete = (url: string, config = {}) => {
    return this._axiosInstance.delete(url, config);
  };
}

import axios, { CreateAxiosDefaults } from "axios";

export class Axios {
  _axiosInstance;
  constructor(config: CreateAxiosDefaults<unknown>) {
    this._axiosInstance = axios.create(config);
  }
}

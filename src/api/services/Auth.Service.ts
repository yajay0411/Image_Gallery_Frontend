import { enqueueSnackbar } from "notistack";
import { HEADERS, TOKEN, USERDETAILS } from "../../constants/constants";
import { URLS } from "../urls/urls";
import { APIService } from "./Api.Service";

export const AuthService = {
  login: async (data = {}) => {
    try {
      const response = await APIService.Instance.post(
        URLS.LOGIN,
        data,
        HEADERS
      );
      // Assuming you might want to do something with the response, like storing the token.
      if (response.data && response.data.token) {
        localStorage.setItem(TOKEN, response.data.token);
        // Optionally, store user details if they are part of the response.
        localStorage.setItem(
          USERDETAILS,
          JSON.stringify(response.data.userDetails)
        );
      }

      enqueueSnackbar(response.data.message, { variant: "success" });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response.data;
      } else {
        enqueueSnackbar(err?.message, { variant: "success" });
      }
    }
  },
  register: async (data = {}) => {
    try {
      const response = await APIService.Instance.post(
        URLS.REGISTER,
        data,
        HEADERS
      );
      enqueueSnackbar("Registration successful", { variant: "success" });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.data) {
        enqueueSnackbar(
          err.response.data.message || "An error occurred during registration",
          { variant: "error" }
        );
        return err.response;
      } else {
        enqueueSnackbar(err?.message || "An unknown error occurred", {
          variant: "error",
        });
      }
      throw err;
    }
  },
};

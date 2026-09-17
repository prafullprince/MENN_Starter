import axios from "axios";
import api from "./axios";
import { LoginInput, RegisterInput } from "./types/auth.types";

export const AuthService = {
  // send_otp
  sendOtp: async (email: string) => {
    try {
      const result = await api.post("/auth/send_otp", { email });
      if (!result) {
        return;
      }
      console.log("result: otp: ", result.data);
      return result.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Something Went wrong");
    }
  },

  // signup
  signup: async (registerInput: RegisterInput) => {
    try {
        const result = await api.post("/auth/signup", registerInput);
        if(!result) {
            return;
        }

        return result.data;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong");
    }
  },

  // login
  login: async (loginInput: LoginInput) => {
    try {
      const result = await api.post("/auth/login", loginInput);
      if(!result) return;

      return result.data;
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Something went wrong");
    }
  },

  // refresh
  refresh: async () => {
    try {
      const result = await api.post("/auth/refresh");
      if(!result) {
        return;
      }

      return result.data;
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      return;
    }
  },
};

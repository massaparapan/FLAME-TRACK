import { registerRequest, loginRequest } from "../types/types";
import { API_URL, handleResponse } from "./api";
import { saveToken, removeToken, getStoredToken } from "./storage";

export const authService = {
  register: async (req: registerRequest) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await handleResponse(response);

      if (data.access_token) {
        await saveToken(data.access_token);
      }

      return data;
    } catch (error) {
      throw new Error("Error en registro");
    }
  },

  login: async (req: loginRequest) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await handleResponse(response);

      if (data.access_token) {
        await saveToken(data.access_token);
      }

      return data;
    } catch (error) {
      throw new Error("Error en login");
    }
  },

  logout: async () => {
    await removeToken();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await getStoredToken();
    return token !== null;
  },
};

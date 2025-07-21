import { deviceCreate } from "../types/types";
import { makeAuthenticatedRequest, API_URL } from "./api";

export const deviceService = {
  createDevice: async (deviceCreate: deviceCreate) => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/devices/`, {
        method: "POST",
        body: JSON.stringify(deviceCreate),
      });
    } catch (error) {
      throw new Error("Error al crear dispositivo");
    }
  },
  
  deleteDevice: async (deviceId: number) => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/devices/${deviceId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Error al eliminar dispositivo");
    }
  },
};

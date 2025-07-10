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

  getDevice: async (deviceId: number) => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/devices/${deviceId}`, {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Error al obtener dispositivo");
    }
  },

  getUserDevices: async (userId: number) => {
    try {
      return await makeAuthenticatedRequest(
        `${API_URL}/devices/user/${userId}`,
        {
          method: "GET",
        }
      );
    } catch (error) {
      throw new Error("Error al obtener dispositivos del usuario");
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

  associateDeviceToUser: async (associationData: {
    device_id: number;
    user_id: number;
  }) => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/devices/associate`, {
        method: "POST",
        body: JSON.stringify(associationData),
      });
    } catch (error) {
      throw new Error("Error al asociar dispositivo");
    }
  },
};

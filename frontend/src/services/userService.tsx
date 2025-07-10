import { makeAuthenticatedRequest, API_URL } from "./api";

export const userService = {
  getCurrentUser: async () => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/users/me`, {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Error al obtener usuario actual");
    }
  },

  getUserPlan: async () => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/users/me/plan`, {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Error al obtener plan del usuario");
    }
  },

  updateUserPlan: async (planId: number) => {
    try {
      return await makeAuthenticatedRequest(
        `${API_URL}/users/me/plan?plan_id=${planId}`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      throw new Error("Error al actualizar plan del usuario");
    }
  },

  getMyDevices: async (): Promise<any[]> => {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/users/me/devices`, {
        method: "GET",
      });
      return response;
    } catch (error: any) {
      console.error("Error al obtener dispositivos del usuario:", error);
      throw new Error(error?.message || "Error al obtener dispositivos del usuario");
    }
  },
};

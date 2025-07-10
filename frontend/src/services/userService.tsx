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
};

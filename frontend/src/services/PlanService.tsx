import { makeAuthenticatedRequest, API_URL } from "./api";

export const planService = {
  getPlans: async () => {
    try {
      return await makeAuthenticatedRequest(`${API_URL}/plans/`, {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Error al obtener planes");
    }
  },
};

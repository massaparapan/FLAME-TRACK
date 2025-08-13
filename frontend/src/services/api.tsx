import { getStoredToken } from "./storage";

// IP of your computer
const API_BASE_URL = "http://192.168.1.3:8000/api";

export const API_URL = API_BASE_URL;

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAuthHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = await getStoredToken();
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...options.headers,
    },
  });

  return handleResponse(response);
};

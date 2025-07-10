import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error al obtener token:", error);
    return null;
  }
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error al guardar token:", error);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error al eliminar token:", error);
  }
};

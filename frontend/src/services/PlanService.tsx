const BASE_URL = "http://192.168.1.7:8000/api/plans";

export const getPlans = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error("Error al obtener los planes");
  return res.json();
};

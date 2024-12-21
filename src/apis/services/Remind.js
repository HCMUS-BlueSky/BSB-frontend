import api from "../axios";

export const getAllRemind = async () => {
  const response = await api.get("/remind");
  return response.data;
};

export const addRemind = async (remind) => {
  const response = await api.post("/remind", remind);
  return response.data;
};


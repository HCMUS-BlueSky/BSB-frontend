import api from "../axios";

export const getAccount = async () => {
  const response = await api.get("/account/me");
  return response.data;
};

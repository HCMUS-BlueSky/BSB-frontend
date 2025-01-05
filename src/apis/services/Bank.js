import api from "../axios";

export const getRegisteredBanks = async () => {
  const response = await api.get("/external/banks");
  return response.data;
};

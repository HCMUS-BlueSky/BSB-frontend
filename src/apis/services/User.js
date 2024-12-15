import api from "../axios";

export const getUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

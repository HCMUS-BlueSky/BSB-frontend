import api from "../axios";

export const getUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const updateUser = async (updateUserDto) => {
  const response = await api.patch("/user/me", updateUserDto);
  return response.data;
};
import api from "../axios";

export const getAccount = async () => {
  const response = await api.get("/account/me");
  return response.data;
};

export const getUserByAccountNumber = async (accountNumber) => {
  const response = await api.get(`/account/${accountNumber}/info`);
  return response.data;
};

export const getUserInfo = async (accountNumberOrEmail) => {
  const response = await api.post("/account/info", {
    accountNumberOrEmail,
  });
  return response.data;
};
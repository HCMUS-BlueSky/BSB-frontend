import api from "../axios";

export const getAccountList = async () => {
  const response = await api.get("/employee/accountList");
  return response.data;
};

export const registerAccount = async (data) => {
  const response = await api.post("/employee/registerUser", data);
  return response.data;
};

export const getAccountDetails = async (accountId) => {
  const response = await api.get(`/employee/account/${accountId}`);
  return response.data;
};

export const deposit = async (data) => {
  const response = await api.post("/employee/topup", data);
  return response.data;
};

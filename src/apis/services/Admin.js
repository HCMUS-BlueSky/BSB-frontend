import api from "../axios";

export const getEmployeeList = async () => {
  const response = await api.get("/employee");
  return response.data;
};

export const addEmployee = async (data) => {
  const response = await api.post("/employee", data);
  return response.data;
};

export const updateEmployee = async (data) => {
  const response = await api.patch(`/employee/${data._id}`, data);
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
  const response = await api.delete(`/employee/${employeeId}`);
  return response.data;
};

export const getAdminExternalTransactions = async (limitDays,selectedBankId) => {
  const response = await api.get("/admin/externalTransactions", {
    params: { limit: limitDays,bank:selectedBankId },
  });
  return response.data;
};

export const getBanks = async () => {
  const response = await api.get("/external/banks");
  return response.data;
};

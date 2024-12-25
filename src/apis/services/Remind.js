import api from "../axios";

export const getAllRemind = async () => {
  const response = await api.get("/remind");
  return response.data;
};

export const addRemind = async (remind) => {
  const response = await api.post("/remind", remind);
  return response.data;
};

export const deleteRemind = async (id, message) => {
  const response = await api.delete(`/remind/${id}`, {
    data: { message },
  });
  return response.data;
};

export const updateRemind = async (id) => {
  const response = await api.patch(`/remind/${id}`);
  return response.data;
};

export const sendOtpForRemind = async (id) => {
  const response = await api.post(`/remind/${id}/otp`);
  return response.data;
};

export const confirmRemind = async (id, otp) => {
  const response = await api.post(`/remind/repay`, { otp, remind: id });
  return response.data;
};

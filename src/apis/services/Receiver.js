import api from "../axios";

export const getReceiver = async () => {
  const response = await api.get("/receiver");
  return response.data;
};

export const addReceiver = async (receiver) => {
  const response = await api.post("/receiver", receiver);
  return response.data;
};

export const updateReceiver = async (receiver) => {
  const response = await api.patch(`/receiver/${receiver.id}`, receiver);
  return response.data;
};

export const deleteReceiver = async (id) => {
  const response = await api.delete(`/receiver/${id}`);
  return response.data;
};

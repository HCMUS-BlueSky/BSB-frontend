import api from "../axios";

export const transferInternal = async (
  accountNumber,
  amount,
  feePayer,
  description,
  saveAsReceiver
) => {
  const response = await api.post("/transfer/internal", {
    accountNumber,
    amount,
    feePayer,
    description,
    saveAsReceiver,
  });
  return response.data;
};

export const confirmTransfer = async (otp, transaction) => {
  const response = await api.post("/transfer/internal/confirm", {
    otp,
    transaction,
  });
  return response.data;
};

export const getTransferHistory = async () => {
  const response = await api.get("/transfer/history");
  return response.data;
};

export const getTransferDetail = async (transactionId) => {
  const response = await api.get(`/transfer/history/${transactionId}`);
  return response.data;
}
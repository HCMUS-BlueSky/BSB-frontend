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
};

export const transferExternal = async (
  accountNumber,
  bankId,
  amount,
  description,
  feePayer,
  saveAsReceiver
) => {
  const response = await api.post("/transfer/external", {
    accountNumber,
    bankId,
    amount,
    description,
    feePayer,
    saveAsReceiver,
  });
  return response.data;
};

export const confirmExternalTransfer = async (otp, transaction) => {
  const response = await api.post("/transfer/external/confirm", {
    otp,
    transaction,
  });
  return response.data;
};

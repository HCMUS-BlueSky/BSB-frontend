import api from "../axios";

export const transferInternal = async (
  accountNumber,
  amount,
  feePayer,
  description
) => {
  const response = await api.post("/transfer/internal", {
    accountNumber,
    amount,
    feePayer,
    description,
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

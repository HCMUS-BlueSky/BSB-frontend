export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("de-DE").format(amount);
};


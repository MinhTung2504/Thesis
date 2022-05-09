export const formatCurrency = (num) => {
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

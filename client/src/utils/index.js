export const formatCurrency = (num) => {
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const ROLES = { HOST: "host", ADMIN: "admin", USER: "user" };

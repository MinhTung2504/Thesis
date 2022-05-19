export const formatCurrency = (num) => {
  const finalNum = Math.floor(num / 1000) * 1000;
  return finalNum.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const ROLES = { HOST: "host", ADMIN: "admin", USER: "user" };

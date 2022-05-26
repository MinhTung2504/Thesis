export const formatCurrency = (num) => {
  const finalNum = Math.floor(num / 1000) * 1000;
  return finalNum.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatDate = (dateInput) => {
  let date, month, year;

  date = dateInput.getDate();
  month = dateInput.getMonth() + 1;
  year = dateInput.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
};

export const ROLES = { HOST: "host", ADMIN: "admin", USER: "user" };
export const BOOKING_STATUS = {
  PAID: "paid",
  NOT_PAID: "not-paid",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

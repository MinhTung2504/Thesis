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

export const smallerTitleHouse = (titleHouse) => {
  const lengthTitle = titleHouse.length;
  if (lengthTitle <= 55) {
    return titleHouse;
  }
  let smalTitle = titleHouse.substring(0, 55);
  return `${smalTitle} ...`;
};

export const ROLES = { HOST: "host", ADMIN: "admin", USER: "user" };
export const BOOKING_STATUS = {
  PAID: "paid",
  NOT_PAID: "not-paid",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

export const destinations = [
  { id: 1, city: "Da Nang" },
  { id: 2, city: "Ho Chi Minh" },
  { id: 3, city: "Ha Noi" },
  { id: 4, city: "Hoi An" },
  { id: 5, city: "Da Lat" },
  { id: 6, city: "Nha Trang" },
  { id: 7, city: "Vung Tau" },
  { id: 8, city: "Quang Ninh" },
  { id: 9, city: "Sa Pa" },
  { id: 10, city: "Quy Nhon" },
  { id: 11, city: "Phu Yen" },
  { id: 12, city: "Can Tho" },
  { id: 13, city: "Phu Quoc" },
  { id: 14, city: "Ba Vi" },
  { id: 15, city: "Thua Thien Hue" },
  { id: 16, city: "Quang Binh" },
];

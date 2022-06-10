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
  CANCELED: "canceled",
};

export const BOOLEAN_STATUS = {
  TRUE: true,
  FALSE: false,
};


function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#A9A9A9" }}
      onClick={onClick}
    />
  );
}
export const settingsReactSlick = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleArrow />,
  prevArrow: <SampleArrow />,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

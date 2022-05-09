import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHouseById } from "../../actions/house";
import { GoLocation } from "react-icons/go";
import { CgDetailsMore, CgSmartHomeRefrigerator } from "react-icons/cg";
import { MdWifi, MdMicrowave } from "react-icons/md";
import { BiRestaurant } from "react-icons/bi";
import { GiGasStove } from "react-icons/gi";
import { FaCampground } from "react-icons/fa";
import DOMPurify from "dompurify";
import ShowMoreText from "react-show-more-text";
import "./HouseDetail.css";
import DetailCarousel from "./DetailCarousel";
import { formatCurrency } from "../../utils";

export default function HouseDetail() {
  // const [isScroll, setIsScroll] = useState(false);
  const [house, setHouse] = useState({});

  // const formatCurrenryVND = (number) => {
  //   number.toLocaleString("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   });
  // };
  // const setFixHeader = () => {
  //   // console.log(window.scrollY);
  //   if (window.scrollY >= 700) {
  //     setIsScroll(true);
  //   } else {
  //     setIsScroll(false);
  //   }
  // };
  // useEffect(() => {
  //   setFixHeader();
  //   window.addEventListener("scroll", setFixHeader);
  // }, []);
  let param = useParams();

  useEffect(() => {
    loadHouseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("re-render");

  const loadHouseById = async () => {
    let h = await getHouseById(param.houseId);
    // console.log(h.data);
    setHouse(h.data);
  };

  // console.log(house);
  // const dirty = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
  // console.log(param);
  // document.getElementById("house_content").innerHTML = house.content;
  return (
    <>
      {/* <div className="container-fluid p-5 text-center">
        <h1>House Detail {param.houseId}</h1>
        <pre>{JSON.stringify(house)}</pre>
        <h1>{house.title}</h1>
      </div> */}

      <div className="detail">
        <div className="detail__slide">
          {/* {house.images} */}
          {/* {console.log(JSON.parse(house.images))} */}
          {/*{console.log(typeof house.images)}
          {console.log(JSON.parse('["a", "b", "c"]'))} */}
          {/* {house} */}
          <DetailCarousel data={house.images} />
        </div>

        <div className="detail__info">
          <div className="detail__info-left">
            <div className="detail__left-header">
              <h5 className="detail__left-header_title">{house.title}</h5>
              <p className="detail__left-header_address">
                <GoLocation /> {house.address}
              </p>
              <p className="detail__left-header_space">
                <CgDetailsMore /> {house.num_beds} giường,
                {house.num_bathrooms} phòng tắm, tối đa {house.max_guests} người
              </p>
              {/* <div dangerouslySetInnerHTML={{ __html: dirty }}></div> */}
              {/* <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dirty) }}
              ></div> */}
              <ShowMoreText lines={4} className="wrapper-class">
                <div
                  className="detail__left-content"
                  id="house_content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(house.content),
                  }}
                ></div>
              </ShowMoreText>
            </div>

            <div className="detail__left-convenient">
              <div className="detail__convenient-title">
                <h3>Tiện ích chỗ ở</h3>
                <p>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</p>
              </div>
              <ul className="detail__convenient-list">
                <li className="detail__convenient-list-item">
                  <h4>Tiện ích</h4>
                  <ul>
                    <li>
                      <MdWifi />
                      <span>Wifi</span>
                    </li>
                    <li>
                      <BiRestaurant />
                      <span>Nhà hàng</span>
                    </li>
                    <li>
                      <FaCampground />
                      <span>Sân chơi</span>
                    </li>
                  </ul>
                </li>
                <li className="detail__convenient-list-item">
                  <h4>Tiện ích bếp</h4>
                  <ul>
                    <li>
                      <GiGasStove />
                      <span>Bếp điện</span>
                    </li>
                    <li>
                      <MdMicrowave />
                      <span>Wifi</span>
                    </li>
                    <li>
                      <CgSmartHomeRefrigerator />
                      <span>Tủ lạnh</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="detail__left-policy">
              <div className="detail__policy-title">
                <h4>Nội quy và chính sách về chỗ ở</h4>
              </div>
              <div className="detail__left-cancel">
                <h5>Chính sách hủy phòng</h5>
                <span>
                  <strong>Nghiêm ngặt:</strong> Hoàn lại 50% giá trị đặt phòng
                  khi khách hàng huỷ phòng trong vòng 48h sau khi đặt phòng
                  thành công và trước 14 ngày so với thời gian check-in. Sau đó,
                  hủy phòng trước 14 ngày so với thời gian check-in, được hoàn
                  lại 50% tổng số tiền đã trả (trừ phí dịch vụ).
                </span>
                <div className="detail__left-cancel_rule">
                  <div className="cancel__rule-title">
                    <div>
                      <p>Đặt phòng thành công</p>
                    </div>
                    <div>
                      <p>Sau 48h</p>
                    </div>
                    <div>
                      <p>14 ngày trước check-in</p>
                    </div>
                    <div>
                      <p>Check-in</p>
                    </div>
                  </div>
                  <div className="cancel__rule-content">
                    <div className="rule-process">
                      <div className="rule-process__symbol is-first">
                        <div className="check-mark"></div>
                        <div className="rule-process__line is-top"></div>
                        <div className="rule-process__line is-bottom"></div>
                      </div>
                      <p className="rule-process__txt">Hoàn tiền 50%</p>
                    </div>
                    <div className="rule-process">
                      <div
                        className="rule-process__symbol"
                        style={{ background: "rgb(255, 181, 0)" }}
                      >
                        <div
                          className="rule-process__line is-top"
                          style={{ background: "rgb(255, 181, 0)" }}
                        ></div>
                        <div
                          className="rule-process__line is-bottom"
                          style={{ background: "rgb(255, 181, 0)" }}
                        ></div>
                      </div>
                      <p className="rule-process__txt">
                        Hoàn tiền 50% (trừ phí dịch vụ)
                      </p>
                    </div>
                    <div className="rule-process" style={{ width: "280px" }}>
                      <div
                        className="rule-process__symbol"
                        style={{ background: "rgb(246, 94, 57)" }}
                      >
                        <div
                          className="rule-process__line is-top is-third"
                          style={{ background: "rgb(246, 94, 57)" }}
                        ></div>
                        <div
                          className="rule-process__line is-bottom is-third"
                          style={{ background: "rgb(246, 94, 57)" }}
                        ></div>
                      </div>
                      <p className="rule-process__txt">Không hoàn tiền</p>
                    </div>
                    <div className="rule-process is-last">
                      <div
                        className="rule-process__symbol is-last"
                        style={{ background: "rgb(246, 94, 57)" }}
                      >
                        <div
                          className="rule-process__line is-top"
                          style={{ background: "rgb(246, 94, 57)" }}
                        ></div>{" "}
                        <div
                          className="rule-process__line is-bottom"
                          style={{ background: "rgb(246, 94, 57)" }}
                        ></div>
                      </div>
                      <p className="rule-process__txt"></p>
                    </div>
                  </div>
                </div>
                <h5>Lưu ý đặc biệt</h5>
                <span>
                  Vui lòng xuất trình giấy tờ tùy thân để Home thực hiện thủ tục
                  khai báo tạm trú
                </span>
                <span>Quý khách vui lòng không checkout muộn hơn 12 giờ</span>
                <span> Quý khách vui long không gây ồn sau 22 giờ</span>
              </div>
            </div>
          </div>

          <div className="detail__info-right">
            <div
              // className={
              //   isScroll ? "detail__right-price active" : "detail__right-price"
              // }
              className={"detail__right-price"}
            >
              <p className="detail__price-info">
                <strong>{house.price && formatCurrency(house.price)}</strong>/1
                đêm
                {/* <strong>{house.price}</strong>/1 đêm */}
              </p>
              <button className="detail__price-book">Đặt ngay</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

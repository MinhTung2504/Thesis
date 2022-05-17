import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHouseById } from "../../actions/house";
import { GoLocation } from "react-icons/go";
import { CgDetailsMore, CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  MdWifi,
  MdMicrowave,
  MdOutlineAirplay,
  MdOutlineOtherHouses,
} from "react-icons/md";
import { GiGasStove, GiWashingMachine } from "react-icons/gi";
import DOMPurify from "dompurify";
import ShowMoreText from "react-show-more-text";
import "./HouseDetail.css";
import DetailCarousel from "./DetailCarousel";
import { formatCurrency } from "../../utils";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { DatePicker } from "antd";

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
      <Header type="position-fixed opacity-75" />
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
                <CgDetailsMore /> {house.num_beds} beds,
                {house.num_bathrooms} bathrooms, maximum {house.max_guests}{" "}
                guests
              </p>
              <p className="detail__left-header_space">
                <MdOutlineOtherHouses /> Property Size: {house.size} m2
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
                <h3>Amenities</h3>
                <p>Amenities and services at the accommodation</p>
              </div>
              <ul className="detail__convenient-list">
                <li className="detail__convenient-list-item">
                  <h4>Facilities</h4>
                  <ul>
                    <li>
                      <MdWifi />
                      <span>Wifi</span>
                    </li>
                    <li>
                      <MdOutlineAirplay />
                      <span>TV</span>
                    </li>
                    <li>
                      <GiWashingMachine />
                      <span>Washing machine</span>
                    </li>
                  </ul>
                </li>
                <li className="detail__convenient-list-item">
                  <h4>Kitchen Facilities</h4>
                  <ul>
                    <li>
                      <GiGasStove />
                      <span>Electric stove</span>
                    </li>
                    <li>
                      <MdMicrowave />
                      <span>Microwave</span>
                    </li>
                    <li>
                      <CgSmartHomeRefrigerator />
                      <span>Fridge/ Freezer</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* <div className="detail__left-policy">
              <div className="detail__policy-title">
                <h4>House Rules & Cancellation Policy</h4>
              </div>
              <div className="detail__left-cancel">
                <h5>Cancellation policy</h5>
                <span>
                  <strong>Flexible:</strong> Guests will receive a full refund
                  if cancel within 48 hours of booking and at least 24 hours
                  before check-in. If guests cancel after 48 hours of booking
                  and at least 24 hours before check-in, the service fee is
                  non-refundable.
                </span>
                <div className="detail__left-cancel_rule">
                  <div className="cancel__rule-title">
                    <div>
                      <p>Reservation Submit</p>
                    </div>
                    <div>
                      <p>48 hours later</p>
                    </div>
                    <div>
                      <p>a day before check-in</p>
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
                      <p className="rule-process__txt">Full refund</p>
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
                        Full refund, minus the service fee
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
                      <p className="rule-process__txt">
                        50% Refund, minus the first night and the service fee
                        and other free
                      </p>
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
                <h5>Special Notes</h5>
                <span>No smoking in the apartment</span>
                <span>Do not use stimulants</span>
                <span>Please keep silent after 10pm</span>
                <span>Do not bring pets</span>
                <span>Please turn off the device when you leave the room</span>
              </div>
            </div> */}

            <div className="detail__left-policy">
              <div className="detail__policy-title">
                <h4>House Rules & Cancellation Policy</h4>
              </div>
              <div className="detail__left-cancel">
                <h5>Cancellation policy</h5>
                <span>
                  <strong>Flexible:</strong> Guests will receive a full refund
                  if cancel within 48 hours of booking and at least 24 hours
                  before check-in. If guests cancel after 48 hours of booking
                  and at least 24 hours before check-in, the service fee is
                  non-refundable.
                </span>
                <div className="detail__left-cancel_rule">
                  {/* <div className="cancel__rule-title">
                    <div>
                      <p>Reservation Submit</p>
                    </div>
                    <div>
                      <p>48 hours later</p>
                    </div>
                    <div>
                      <p>a day before check-in</p>
                    </div>
                    <div>
                      <p>Check-in</p>
                    </div>
                  </div> */}
                  <div className="cancel__rule-content">
                    <div className="rule-process">
                      <div className="rule-process__symbol is-first">
                        <div className="check-mark"></div>
                        <div className="rule-process__line is-top"></div>
                        <div className="rule-process__line is-bottom"></div>
                      </div>
                      <p className="rule-process__txt">Full refund</p>
                      <p className="rule-process__title">Reservation Submit</p>
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
                        Full refund, minus the service fee
                      </p>
                      <p class="rule-process__title">48 hours later</p>
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
                      <p className="rule-process__txt">
                        50% Refund, minus the first night and the service fee
                        and other free
                      </p>
                      <p class="rule-process__title">a day before check-in</p>
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
                      <p class="rule-process__title">Check-in</p>
                    </div>
                  </div>
                </div>
                <h5>Special Notes</h5>
                <span>No smoking in the apartment</span>
                <span>Do not use stimulants</span>
                <span>Please keep silent after 10pm</span>
                <span>Do not bring pets</span>
                <span>Please turn off the device when you leave the room</span>
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
                <strong>{house.price && formatCurrency(house.price)}</strong>/
                night
                {/* <strong>{house.price}</strong>/1 đêm */}
              </p>
              <DatePicker
                placeholder="From date"
                className="form-control"
                // onChange={(date, dateString) =>
                //   setValues({ ...values, from: dateString })
                // }
                // disabledDate={(current) =>
                //   current && current.valueOf() < moment().subtract(1, "days")
                // }
              />

              <DatePicker
                placeholder="To date"
                className="form-control "
                // onChange={(date, dateString) =>
                //   setValues({ ...values, to: dateString })
                // }
                // disabledDate={(current) =>
                //   current && current.valueOf() < moment().subtract(1, "days")
                // }
              />
              <h5 className="detail__price-info">
                Total:{" "}
                <strong>{house.price && formatCurrency(house.price)}</strong>
              </h5>
              <button className="detail__price-book">Book now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHouseById, getSimilarHouses } from "../../actions/house";
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
import RecommendHouses from "./RecommendHouses";

export default function HouseDetail() {
  // const [isScroll, setIsScroll] = useState(false);
  const [house, setHouse] = useState({});
  const [similarHouse, setSimilarHouse] = useState([])

  let param = useParams();
  // console.log(typeof param.houseId);

  useEffect(() => {
    loadHouseById();
    loadSimilarHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("re-render");

  const loadHouseById = async () => {
    let h = await getHouseById(param.houseId);
    // console.log(h.data);
    setHouse(h.data);
  };

  const loadSimilarHouses = async () => {
    // console.log(house.price);
    // let res = await getSimilarHouses(house.city, `price[gte]=${house.price}`)
    let res = await getSimilarHouses(param.houseId)
    console.log(res);
    setSimilarHouse(res.data);
  }



  // console.log(house);
  // const dirty = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
  // console.log(param);
  // document.getElementById("house_content").innerHTML = house.content;
  return (
    <>
      <Header type="position-fixed opacity-75" />
      <div className="detail">
        <div className="detail__slide">
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
              className={"detail__right-price"}
            >
              <p className="detail__price-info">
                <strong>{house.price && formatCurrency(house.price)}</strong>/
                night
              </p>
              <Link to={`/check-booking/${param.houseId}`}>
                <button className="detail__price-book text-black">
                  Book now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {house && <RecommendHouses similarHouse={similarHouse} />}
      <Footer />
    </>
  );
}

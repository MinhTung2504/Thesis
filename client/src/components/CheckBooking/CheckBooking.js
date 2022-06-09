import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHouseById } from "../../actions/house";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { DatePicker } from "antd";
import moment from "moment";
import { formatCurrency } from "../../utils";
import { createNewBooking } from "../../actions/booking";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../actions/email";

export default function CheckBooking() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [house, setHouse] = useState({});
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  let navigate = useNavigate();
  //   console.log(auth.user.name);

  const [values, setValues] = useState({
    date_check_in: "",
    date_check_out: "",
  });

  const { date_check_in, date_check_out } = values;
  const date_check_inObj = moment(date_check_in);
  const date_check_outObj = moment(date_check_out);
  // console.log(date_check_inObj, date_check_outObj);
  const totalDays = moment
    .duration(date_check_outObj.diff(date_check_inObj))
    .asDays();
  // setTotalAmout(totalDays);

  const totalAmout = house.price * totalDays;

  let param = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      loadHouseById();
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("re-render");

  const loadHouseById = async () => {
    let h = await getHouseById(param.houseId);
    // console.log(h.data);
    setHouse(h.data);
  };
  const bookingInformation = {
    payment: totalAmout,
    date_check_in: date_check_in,
    date_check_out: date_check_out,
    house: { _id: param.houseId, image: house.image, title: house.title },
  };
  console.log(bookingInformation);

  const sendEmailToNotify = async (data) => {
    await sendEmail(token, data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await createNewBooking(token, bookingInformation);
      console.log(res);
      toast.success("New Booking is created");
      navigate("/user-booking");
      sendEmailToNotify({
        email: res.data.house.host.email,
        subject: `You have a booking of your ${res.data.house.title} !`,
        content: `You can check it following this link: ${process.env.REACT_APP_URL}/host/bookings`,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <Header />
      {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
      {/* <div>CheckBooking</div>
      <p>{JSON.stringify(house)}</p> */}
      {loading ? (
        <h1> Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div className="m-5">
          <div
            className="row justify-content-center"
            style={{
              boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
              marginTop: "20px",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <div className="col-md-5">
              <h1>{house.title}</h1>
              <img
                style={{ width: "90%", borderRadius: "5px" }}
                src={house.image}
                alt="houseCheckBookingImg"
              />
            </div>
            <div className="col-md-5" style={{ textAlign: "center" }}>
              <div className="mt-3">
                <b>
                  <h1>Booking Details</h1>
                  <hr />
                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Guest's Name: </p>
                    </div>
                    <div className="form-group col-md-6">
                      <p>{auth.user.name} </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Check in date: </p>
                    </div>
                    <div className="form-group col-md-6">
                      <DatePicker
                        placeholder="From Date"
                        className="form-control"
                        onChange={(date, dateString) =>
                          setValues({ ...values, date_check_in: dateString })
                        }
                        disabledDate={(current) =>
                          current &&
                          current.valueOf() < moment().subtract(1, "days")
                        }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Check out date: </p>
                    </div>
                    <div className="form-group col-md-6">
                      <DatePicker
                        placeholder="To Date"
                        className="form-control"
                        onChange={(date, dateString) =>
                          setValues({ ...values, date_check_out: dateString })
                        }
                        disabledDate={(current) =>
                          current && current.valueOf() < date_check_inObj
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Max Guests: </p>
                    </div>
                    <div className="form-group col-md-6">
                      <p>{house.max_guests}</p>
                    </div>
                  </div>
                </b>
              </div>

              <div className="mt-5">
                <b>
                  <h1>Amount: </h1>
                  <hr />
                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Total Days:</p>
                    </div>
                    <div className="form-group col-md-6">
                      <p>{totalDays ? totalDays : ""} </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Price Per Night: </p>
                    </div>
                    <div className="form-group col-md-6">
                      <p>{house.price && formatCurrency(house.price)}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <p>Total Amount:</p>
                    </div>
                    <div className="form-group col-md-6">
                      <p>{totalAmout ? formatCurrency(totalAmout) : ""}</p>
                    </div>
                  </div>
                </b>
              </div>

              <div>
                <button
                  style={{ textAlign: "right" }}
                  className="btn btn-primary mt-5"
                  onClick={handleSubmit}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

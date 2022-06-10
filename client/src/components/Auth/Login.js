import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../actions/auth";
import LoginForm from "../Forms/LoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Header from "../Header/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCALSTORAGE THEN REDIRECT ===>"
        );
        // console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  return (
    <>
      <Header />
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 h-100">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best accommodation <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your travel
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                We provide affordable rental homestay services for your travel, helping you to have a great vacation experience.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <LoginForm
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

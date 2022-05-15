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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
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

      {/* <Fade duration={600}> */}
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-4 mx-auto mt-2 mb-5">
            <h3 className="mb-3">Login</h3>
            <form method="post">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className={`form-control`}
                  name="username"
                  placeholder={"Username or email address"}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`form-control `}
                  name="password"
                  placeholder={"Your password"}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group auth-control">
                <div className="row">
                  <div className="col">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="remember"
                        name="remember"
                        value="1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="remember"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-block btn-primary mb-3">Login</button>
            </form>
            <div className="text-center auth-control">
              <span>Not a member? </span>
            </div>
          </div>
        </div>
      </div> */}
      {/* </Fade> */}
    </>
  );
}

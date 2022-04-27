/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <div
        className="nav bg-dark opacity-75 d-flex justify-content-between w-100 position-fixed p-3"
        style={{ zIndex: 1000 }}
      >
        <div>
          <Link className="nav-link brand-name" to="/">
            NICE HOMESTAY
          </Link>
        </div>

        <div className="d-flex ">
          {auth !== null && (
            <>
              <Link className="nav-link" to="host-dashboard">
                Dashboard
              </Link>
            </>
          )}

          {auth !== null && (
            <>
              <p className="nav-link">Hello, {auth.user.name}</p>
              <a className="nav-link pointer" onClick={logout}>
                Logout
              </a>
            </>
          )}

          {auth === null && (
            <>
              <Link className="nav-link" to="login">
                Login
              </Link>
              <Link className="nav-link" to="register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

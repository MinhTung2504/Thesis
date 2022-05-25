/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FaRegBell } from "react-icons/fa";
import { ROLES } from "../../utils";
import { Dropdown } from "react-bootstrap";

export default function Header(typeofHeader) {
  // console.log(typeofHeader);
  const type = typeofHeader.type;
  // console.log(t);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  // console.log(auth.user.role);
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
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark ${type} w-100 p-3`}
        // className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed opacity-75 w-100 p-3"
        style={{ zIndex: 1000 }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            NICE HOMESTAY
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <div className="d-flex">
              <Link className="nav-link" to="/search-house">
                HomeStay
              </Link>
            </div>

            {auth !== null && auth.user.role === ROLES.HOST && (
              <>
                <div className="d-flex">
                  <Link className="nav-link" to="/host">
                    Host Dashboard
                  </Link>
                </div>
              </>
            )}
            {auth !== null && auth.user.role === ROLES.ADMIN && (
              <>
                <div className="d-flex">
                  <Link className="nav-link" to="/admin">
                    Admin Dashboard
                  </Link>
                </div>
              </>
            )}

            {auth !== null && (
              <>
                {/* <div class="d-flex dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hello, {auth.user.name}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link class="dropdown-item" to="/user-profile">
                        Your Profile
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/user-booking">
                        Booking History
                      </Link>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-flex">
                  <FaRegBell
                    style={{
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                </div> */}
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" variant="secondary">
                    Hello, {auth.user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link className="text-black" to="/user-profile">
                        Your Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="text-black" to="/user-booking">
                        Booking History
                      </Link>
                    </Dropdown.Item>
                    <hr className="dropdown-divider" />
                    <Dropdown.Item>
                      <a className="text-black" onClick={logout}>
                        Logout
                      </a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex">
                  <FaRegBell
                    style={{
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                </div>
              </>
            )}

            {auth === null && (
              <>
                <div className="d-flex">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </div>
                <div className="d-flex">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

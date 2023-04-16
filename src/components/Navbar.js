import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from './Model'
import { useSelector } from "react-redux";
import Cart from "../screens/Cart";


export default function Navbar(props) {
 
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

const handlemycart = ()=>{
  // navigate("/cart");
  setCartview(true)
}

  const amount = useSelector((state) => state.amount);

  const [cartview,setCartview] = useState(false);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg   navbar-${props.mode} bg-${props.mode}  `}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/">
            {props.title}
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
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/reset">
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/verify">
                  Verify
                </Link>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                onClick={props.togglemode}
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className={`form-check-label text-${
                  props.mode === "light" ? "dark" : "light"
                } `}
                htmlFor="flexSwitchCheckChecked"
              >
                Enable {props.mode === "light" ? "Dark" : "Light"} Mode
              </label>
              <div>
                {!localStorage.getItem("token") ? (
                  <div className="d-flex">
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="btn bg-white text-success mx-1">
                      <i
                        className="fa fa-shopping-cart"
                        style={{ "font-size": "30px" }}
                      ></i>{" "}
                      <span className="badge badge-warning" id="lblCartCount" >
                        {" "}
                        {amount}{" "}
                      </span>{" "}
                     <button className="btn" onClick={handlemycart}>My Cart</button> 
                    </div>
                    {cartview?<Model onClose={()=>setCartview(false)}><Cart/></Model>
                      :null}
                      <button
                        onClick={logout}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Logout
                      </button>
                    
                  </div>
                )}
              </div>
            </div>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-primary" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Set Title",
  aboutText: "set text",
};

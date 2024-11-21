import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaSearch, FaShoppingCart, FaHome, FaInfoCircle, FaUtensils, FaEnvelope } from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ handleLogout }) => {
  const { cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  // Calculate the total number of items in the cart
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, itemCount) => total + itemCount, 0);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Logo */}
        <div className="logo-container" style={{ flex: "1" }}>
          <img src="./logo.png" alt="Logo" style={{ height: "40px", cursor: "pointer" }} />
        </div>

        {/* Centered Links with Icons */}
        <ul className="navbar-links" style={{ flex: "2", display: "flex", justifyContent: "center", gap: "20px", listStyleType: "none" }}>
          <li>
            <NavLink to="/" activeClassName="active">
              <FaHome style={{ marginRight: "8px" }} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              <FaInfoCircle style={{ marginRight: "8px" }} /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" activeClassName="active">
              <FaUtensils style={{ marginRight: "8px" }} /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              <FaEnvelope style={{ marginRight: "8px" }} /> Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="navbar-actions" style={{ flex: "1", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
          
          <NavLink to="/search" className="icon"><FaSearch /></NavLink>
          {/* Cart Icon with Item Count */}
          <NavLink to="/cart" className="icon">
            <FaShoppingCart />
            {getTotalItems() > 0 && (
              <span className="cart-item-count">{getTotalItems()}</span>
            )}
          </NavLink>
          <button className="auth-btn logout" onClick={handleLogout}>
              Logout </button>
          {/* {!isLoggedIn ? (
            <>
              <button
                className="auth-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="auth-btn signup"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="auth-btn logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )} */}

           </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { setUser } from "../store/userReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/main.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  if (user.name && user.email) {
    return <Navigate to="/products" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({ name, email }));
    navigate("/products");
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">
              <i className="bi bi-bag-heart"></i>
            </div>
            <h1 className="register-title">Welcome!</h1>
            <p className="register-description">
              Join our community of shoppers and discover amazing products
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <input
                type="email"
                className="form-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#4f46e5";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#6366f1";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <i className="bi bi-arrow-right-circle" style={{ fontSize: "20px" }}></i>
              <span>Start Shopping</span>
            </button>

            <div className="terms-text">
              By registering, you agree to our Terms of Service and Privacy Policy
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

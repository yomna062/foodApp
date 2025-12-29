import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";
import "./Register.css";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  // Watch password to compare with confirmPassword
  const password = watch("password");

  const onSubmit = async (data) => {
    // Destructure to remove confirmPassword from the payload sent to the server
    const { confirmPassword, ...registerData } = data;

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        registerData
      );

      toast.success(response.data?.message || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="register-box w-75">
        {/* Logo Section */}
                   <div className="logo-container text-center">
                    <img src={logo} alt="Logo" className="logo mb-4 w-25" />
                  </div>

        {/* Header Section */}
        <div className="form-title">
          <h5 className="fw-bold">Register</h5>
          <p className="text-muted">Welcome Back! Please enter your details</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            
            {/* UserName */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  placeholder="UserName"
                  {...register("userName", {
                    required: "User name is required",
                    minLength: { value: 3, message: "Username too short" }
                  })}
                />
              </div>
              {errors.userName && <small className="text-danger">{errors.userName.message}</small>}
            </div>

            {/* Email */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            {/* Country */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-solid fa-globe"></i>
                <input
                  type="text"
                  placeholder="Country"
                  {...register("country", {
                    required: "Country is required",
                  })}
                />
              </div>
              {errors.country && <small className="text-danger">{errors.country.message}</small>}
            </div>

            {/* Phone Number */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <input
                  type="tel"
                  placeholder="PhoneNumber"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
              </div>
              {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber.message}</small>}
            </div>

            {/* Password */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span className="password-toggle" onClick={() => setShowPass(!showPass)}>
                  <i className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>

            {/* Confirm Password */}
            <div className="input-group-custom">
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <span className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  <i className={`fa-regular ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword.message}</small>
              )}
            </div>
          </div>

          <div className="login-link text-end my-3">
            <Link to="/login" className="text-success text-decoration-none">
              Login Now?
            </Link>
          </div>

          <button className=" w-100 border-0 text-white  py-2 px-4 rounded my-4 main-bg" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
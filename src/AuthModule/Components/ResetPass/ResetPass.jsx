import React from "react";
import logo from "../../../assets/images/logo.png";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // بدل watch — الأفضل
  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );

      toast.success("Password reset successfully!");
      navigate("/Login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid overLay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="form-container bg-white p-4 rounded shadow">

              {/* Logo */}
              <div className="logo-container text-center">
                <img src={logo} alt="Logo" className="logo mb-4 w-50" />
              </div>

              <div>
                <h5>Reset Your Password</h5>
                <p className="text-muted mb-4">
                  Enter the code sent to your email and create a new password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "border-danger" : "border-gray-300"
                    }`}
                    placeholder="Enter your E-mail"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}

                {/* Seed Code */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.seed ? "border-danger" : "border-gray-300"
                    }`}
                    placeholder="Enter Verification Code"
                    {...register("seed", { required: "Seed is required" })}
                  />
                </div>
                {errors.seed && (
                  <p className="text-danger">{errors.seed.message}</p>
                )}

                {/* New Password */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "border-danger" : "border-gray-300"
                    }`}
                    placeholder="New Password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must contain uppercase, lowercase, number & special char, min 6 chars",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}

                {/* Confirm Password */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "border-danger" : "border-gray-300"
                    }`}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword.message}</p>
                )}

                {/* Submit button */}
                <button className="text-light border-0 main-bg w-100 mt-2 p-2 " type="submit">
                  Reset Password
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import logo from '../../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data);
      toast.success('Login Successful!');
      navigate('/dashboard'); 
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
      toast.error('Login Failed! Please check your credentials.');
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

              <h4>Log in</h4>
              <h6 className="text-muted mb-5">Welcome Back! Please enter your details</h6>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email Input */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${errors.email ? 'border-danger' : 'border-gray-300'} focus:border-blue-500 focus:shadow-md transition`}
                    placeholder="Enter your E-mail"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="alert alert-danger">{errors.email.message}</p>}

                {/* Password Input */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'border-danger' : 'border-gray-300'} focus:border-blue-500 focus:shadow-md transition`}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                  />
                </div>
                {errors.password && <p className="alert alert-danger">{errors.password.message}</p>}

                {/* Links */}
                <div className="Links d-flex justify-content-between">
                  <Link to="/Register" className="text-decoration-none text-dark">Register Now?</Link>
                  <Link to="/ForgetPass" className="text-decoration-none main-color">Forgot Password?</Link>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-100 border-0 text-white  py-2 px-4 rounded my-4 main-bg"
                  >
                    Log In
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

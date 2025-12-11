import React from 'react';
import logo from '../../../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import  Axios  from 'axios';
import { toast } from "react-toastify";

import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
    const navigate =useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();   

  const onSubmit = async(data) => {

    try{
      const response=await Axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      
      toast.success(response.data.message);
      navigate('/ResetPass')

    }catch(error){
      console.error('There was an error!', error);
      toast.error('Failed to send reset link! Please try again.');
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
                <h5>Forgot Your Password?</h5>
                <p className="text-muted mb-5 fs-6">
                  No worries! Please enter your email and we will send a password reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email */}
                <div className="input-group mb-3 flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-envelope"></i>
                  </span>

                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className={`form-control ${
                      errors.email ? 'border-danger' : ''
                    }`}
                    placeholder="Enter your email"
                    aria-label="Email"
                    aria-describedby="addon-wrapping"
                  />
                </div>

                {/* Error Message */}
                {errors.email && (
                  <p className="text-danger small">{errors.email.message}</p>
                )}

                {/* Submit Button */}
                <button className="text-light border-0 main-bg w-100 mt-2 p-2 " type="submit">
                  Send Reset Link
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

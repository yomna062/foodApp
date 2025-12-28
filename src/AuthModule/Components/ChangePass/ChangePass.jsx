import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ChangePass() {


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        'https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword',
        { oldPassword, newPassword, confirmNewPassword: confirmPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Password changed successfully!');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error changing password');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
      <h2>Change Password</h2>
      <p>Enter your old and new password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-50">
        {/* Old Password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Old Password"
            {...register("oldPassword", { required: "Old password is required" })}
          />
        </div>
        {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}

        {/* New Password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            {...register("newPassword", { required: "New password is required" })}
          />
        </div>
        {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}

        {/* Confirm Password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            {...register("confirmPassword", { required: "Confirm password is required" })}
          />
        </div>
        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

        <button type="submit" className="border-0 py-2 rounded-2 text-light secondary-bg w-100">
          Change Password
        </button>
      </form>


    </div>
  );
}

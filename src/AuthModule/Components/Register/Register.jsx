import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'; // تأكد من مسار الصورة

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // user أو admin

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
    // هنا يمكن إضافة الاتصال بالـ API لتسجيل الدخول
  };

  return (
    <div className="container-fluid vh-100" style={{ background: '#1a1a2e' }}>
      <div className="row h-100">
        {/* الجانب الأيسر: اختيار الدور */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-center text-white" style={{ background: '#162447' }}>
          <h2 className="mb-4">Welcome Back!</h2>
          <p className="mb-4">Please select your role to login</p>
          <div className="btn-group mb-4" role="group">
            <button
              type="button"
              className={`btn ${role === 'user' ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setRole('user')}
            >
              User
            </button>
            <button
              type="button"
              className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>
        </div>

        {/* الجانب الأيمن: الفورم */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="form-container bg-white p-5 rounded shadow w-75">
            {/* Logo */}
            <div className="text-center mb-4">
              <img src={logo} alt="Logo" className="w-50" />
            </div>

            <h4 className="text-center mb-2">Log In</h4>
            <p className="text-muted text-center mb-4">Enter your details to access your account</p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Links */}
              <div className="d-flex justify-content-between mb-3">
                <Link to="/Register" className="text-decoration-none text-dark">
                  Register Now?
                </Link>
                <Link to="/ForgetPass" className="text-decoration-none text-primary">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

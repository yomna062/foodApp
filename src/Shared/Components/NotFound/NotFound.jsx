import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import notfoundimg from '../../../assets/images/NotFound-removebg-preview.png';
import logoimg from '../../../assets/images/logo.png';
import './NotFound.css'
export default function NotFound() {
  return (
    <div className="not-found-wrapper d-flex align-items-center justify-content-center">
      {/* Logo: Positioned top-left */}
      <div className="position-absolute top-0 start-0 p-4 p-md-5">
        <Link to="/">
          <img src={logoimg} alt="Company Logo" style={{ width: '160px', cursor: 'pointer' }} />
        </Link>
      </div>

      <div className="container">
        <div className="row align-items-center min-vh-100">
          
          {/* Left Side: Content */}
          <div className="col-md-5 text-start order-2 order-md-1">
            <h1 className="fw-bold display-3" style={{ color: '#2d3e50' }}>Oops.</h1>
            <h2 className="display-6 mb-3" style={{ color: '#00964c' }}>Page not found</h2>
            
            <p className="text-muted fs-5 mb-4">
              This page doesn’t exist or was removed!<br />
              We suggest you go back to the home page.
            </p>

            <Link to="/" className="btn btn-success btn-lg back-btn px-4 py-2">
              <i className="fa-solid fa-arrow-left me-2"></i>
              <span>Back To Home</span>
            </Link>
          </div>

          {/* Right Side: Illustration */}
          <div className="col-md-7 text-center order-1 order-md-2 mb-5 mb-md-0">
            <img 
              src={notfoundimg} 
              alt="404 Illustration" 
              className="img-fluid floating-animation" 
              style={{ maxWidth: '85%' }} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}
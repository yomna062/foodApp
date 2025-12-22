import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  const { loginData } = useContext(AuthContext);

  if (localStorage.getItem('token') || loginData) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

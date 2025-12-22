// import React, { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';

// export const AuthContext = createContext(null);

// export default function AuthContextProvider(props) {
//   const [loginData, setLoginData] = useState(null);

//   const saveLoginData = () => {
//     const encodedToken = localStorage.getItem('token');

//     if (encodedToken) {
//       const decodedToken = jwtDecode(encodedToken);
//       setLoginData(decodedToken);
//       console.log(decodedToken);
      
//     }
//   };
//     const Logout=()=>{
//         localStorage.removeItem('token')
//         setLoginData(null)
//         toast.success('Bye Byeeeeeeeeeee')
//     }
  

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       saveLoginData();
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loginData, saveLoginData,Logout}}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null)

  const saveLoginData = () => {
    const token = localStorage.getItem('token')

    // ✅ Guard قوي
    if (!token || token === 'null' || token === 'undefined') {
      setLoginData(null)
      return
    }

    try {
      const decoded = jwtDecode(token)
      setLoginData(decoded)
      console.log(decoded)
    } catch (error) {
      console.error('Invalid token:', error)
      localStorage.removeItem('token')
      setLoginData(null)
    }
  }

  const Logout = () => {
    localStorage.removeItem('token')
    setLoginData(null)
    toast.success('Bye Bye 👋')
  }

  useEffect(() => {
    saveLoginData()
  }, [])

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

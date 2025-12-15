import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
export default function MasterLayout() {
  return (
    <>
    <div className="d-flex vh-100">
      
      <div >
        <SideBar/>
      </div>


    
    <div className='w-100 mx-3'>
      <Navbar/>
      <Outlet  />
    </div>
    </div>
    </>
  )
}

import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
export default function MasterLayout() {
  return (
    <>
    <div className="d-flex vh-100">
      <SideBar/>


    </div>
    <div className='w-100'>
      <Navbar/>
      <Outlet/>
    </div>
    </>
  )
}

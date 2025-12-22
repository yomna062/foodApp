import React, { useContext } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import headerimg1 from '../../../assets/images/header1.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';


export default function Dashboard() {
 const navigate= useNavigate()
   const {loginData}  =useContext(AuthContext)
  return (
    <>
      {/* Header */}
      <Header
        title="Welcome"
        subtitle={loginData?.userName}
        description="This is a welcoming screen for the entry of the application, you can now see the options"
        imgUrl={headerimg1}
        minHeight="280px"
        imgWidth="75"
      />
      

      <div className='dashboard-details  d-flex flex-column flex-md-row align-items-center align-items-md-center p-4 p-md-5 justify-content-between my-3 rounded-4 shadow-sm bg-white'>

       
        <div className="caption w-50">
          <h4>
            Fill the <span className='secondary-color'>Recipes!</span>
          </h4>
          <p className='text-muted mb-0'>
            You can now fill the meals easily using the table and form. Click here and fill it with the table!
          </p>
        </div>

       <div className="w-full md:w-1/2 text-end">
  <button onClick={()=> navigate('/dashboard/recipes-list')}
    className="w-full md:w-auto  text-white  py-2 px-5 gap-2  flex items-center justify-center md:justify-start   border-0 secondary-bg rounded-2"
  >
    Fill Recipes 
    <i className="fa-solid fa-arrow-right transition-transform duration-200"></i>
   
  </button>
</div>


      </div>
    </>
  );
}
import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerimg2 from '../../../assets/images/header2.png'

export default function UsersList() {
  return (
    <>
      <Header
        title="Users"
        subtitle="List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        minHeight="200px"
        imgWidth="50"
      />

      <div>UsersList</div>
    </>
  )
}

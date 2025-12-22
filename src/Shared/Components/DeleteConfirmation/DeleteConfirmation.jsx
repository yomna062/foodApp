import React from 'react'
import nodata from '../../../assets/images/nodata.svg'
export default function DeleteConfirmation({deleteItem,name}) {
  return (
    <>
    <div className='text-center'>
        <img src={nodata} alt={'no data'} />
        <h6 className='mt-3'>Delete This {deleteItem} {name} ?</h6>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
    </>
  )
}

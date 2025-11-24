import React from 'react'
import { Link } from 'react-router-dom'

const Department = () => {
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Danh sách khoa/phòng</h3>
        </div>

        <Link to="/dashboard/add_department" className='btn btn-success'>Thêm khoa/phòng</Link>
    </div>
  )
}

export default Department
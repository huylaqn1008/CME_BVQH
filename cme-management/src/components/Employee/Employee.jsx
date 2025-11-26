import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Employee = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Danh sách bác sĩ</h3>
      </div>

      <Link to='/dashboard/add_employee' className='btn btn-success'>
        Thêm bác sĩ
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Ảnh đại diện</th>
              <th>Tên bác sĩ</th>
              <th>Tên tài khoản</th>
              <th>Số CCCD</th>
              <th>Tên khoa/phòng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((c, idx) => (
              <tr key={c.id ?? c.name ?? idx} className="align-middle">
                <td className="align-middle">
                  <img
                    src={`http://localhost:3000/images/${c.image}`}
                    className="employee_image w-12 h-12 mx-auto"
                    alt={c.name}
                  />
                </td>
                <td className="align-middle">{c.name}</td>
                <td className="align-middle">{c.user}</td>
                <td className="align-middle">{c.cccd}</td>
                <td className="align-middle">{c.department}</td>
                <td className="align-middle">
                  <Link to={`/dashboard/edit_employee/${c.id}`} className="border px-2 py-1 mr-2 btn btn-info btn-sm">Edit</Link>
                  <button className="border px-2 py-1 btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
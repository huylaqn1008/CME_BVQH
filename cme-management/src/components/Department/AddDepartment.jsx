import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_department', {department})
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/department');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Thêm khoa/phòng</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='department'><strong>Khoa/Phòng:</strong></label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            placeholder="Nhập tên khoa/phòng..."
                            className="form-control rounded-0"
                            onChange={(e) => {
                                setDepartment(e.target.value);
                            }}
                        />
                    </div>

                    <button className='btn btn-success w-100 rounded-0 mb-2'>Thêm mới</button>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment
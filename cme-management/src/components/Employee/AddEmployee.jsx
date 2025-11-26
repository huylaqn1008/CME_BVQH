import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        user: "",
        password: "",
        cccd: "",
        department_id: "",
        image: ""
    });

    const [department, setDepartment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
            .then(result => {
                if (result.data.Status && Array.isArray(result.data.Result)) {
                    setDepartment(result.data.Result);
                } else {
                    console.error("Invalid department data:", result.data);
                    setDepartment([]);
                }
            })
            .catch(err => {
                console.error("Error fetching departments:", err);
                setDepartment([]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate
        if (!employee.name || !employee.user || !employee.password || !employee.cccd || !employee.department_id) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('user', employee.user);
        formData.append('password', employee.password);
        formData.append('cccd', employee.cccd);
        formData.append('department_id', employee.department_id);
        if (employee.image) {
            formData.append('image', employee.image);
        }

        axios.post('http://localhost:3000/auth/add_employee', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(result => {
                if (result.data.Status) {
                    alert("Thêm bác sĩ thành công!");
                    navigate('/dashboard/employee');
                } else {
                    alert("Lỗi: " + (result.data.Error || "Không xác định"));
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("Lỗi kết nối server");
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Thêm bác sĩ</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Tên bác sĩ</label>
                        <input
                            type="text"
                            className='form-control rounded-0'
                            id='inputName'
                            placeholder='Nhập tên bác sĩ...'
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputUser" className='form-label'>Tên đăng nhập</label>
                        <input
                            type="text"
                            className='form-control rounded-0'
                            id='inputUser'
                            placeholder='Nhập tên đăng nhập...'
                            autoComplete='off'
                            value={employee.user}
                            onChange={(e) => setEmployee({ ...employee, user: e.target.value })}
                        />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputPassword" className='form-label'>Mật khẩu</label>
                        <input
                            type="password"
                            className='form-control rounded-0'
                            id='inputPassword'
                            placeholder='Nhập mật khẩu...'
                            value={employee.password}
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                        />

                        <label htmlFor="inputCCCD" className='form-label'>CCCD</label>
                        <input
                            type="text"
                            className='form-control rounded-0'
                            id='inputCCCD'
                            placeholder='Nhập CCCD...'
                            autoComplete='off'
                            maxLength={12}
                            value={employee.cccd}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, "");
                                const limited = onlyNums.slice(0, 12);
                                setEmployee({ ...employee, cccd: limited });
                            }}
                        />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="selectDepartment" className='form-label'>Khoa/phòng</label>
                        <select
                            name="selectDepartment"
                            id="selectDepartment"
                            className='form-select'
                            value={employee.department_id}
                            onChange={(e) => setEmployee({ ...employee, department_id: e.target.value })}
                        >
                            <option value="">-- Chọn khoa/phòng --</option>
                            {
                                Array.isArray(department) && department.length > 0 ? (
                                    department.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Không có khoa/phòng</option>
                                )
                            }
                        </select>
                    </div>

                    <div className='col-12 mb-3'>
                        <label className='form-label' htmlFor='inputGroupFile'>
                            Ảnh đại diện
                        </label>
                        <input
                            type='file'
                            className='form-control rounded-0'
                            id='inputGroupFile'
                            name='image'
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        />
                    </div>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Thêm mới</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee;
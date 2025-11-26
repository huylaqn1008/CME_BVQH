import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/department")
      .then(result => {
        if (result.data.Status) {
          setDepartments(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Danh sách khoa/phòng</h3>
      </div>

      <Link to="/dashboard/add_department" className="btn btn-success">
        Thêm khoa/phòng
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Tên khoa/phòng</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map((c, idx) => (
                <tr key={c.id ?? c.name ?? idx}>
                  <td>{c.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Department;

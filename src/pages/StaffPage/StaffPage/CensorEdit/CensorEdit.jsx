import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CensorEdit.css'; // Reusing the same CSS as AddStaff

const EditStaff = () => {
  const { id } = useParams(); // Get the staff id from the route
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    phone: '',
    password: '',
    email: '',
    name: '',
    role: 'censor', // Role remains as 'censor'
    status: true,   // Status remains true by default
  });

  // Fetch staff details by ID when component mounts
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`);
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff details:', error);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, staff);
      alert('Nhân viên đã được cập nhật thành công!');
      navigate('/staff/censorstaff'); // Navigate back to staff list after editing
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Có lỗi xảy ra khi cập nhật nhân viên.');
    }
  };

  return (
    <div className='addstaff'>
      <h1>Chỉnh sửa tài khoản người kiểm duyệt</h1>
      <hr />
      <form onSubmit={handleSubmit} className='add-form'>
        <div>
          <label>Tên nhân viên</label>
          <input
            type="text"
            name="name"
            value={staff.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={staff.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={staff.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={staff.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-form-button-container">
          <button type="submit">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default EditStaff;

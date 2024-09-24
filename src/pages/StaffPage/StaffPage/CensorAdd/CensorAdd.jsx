import React, { useState } from 'react';
import axios from 'axios';
import './CensorAdd.css';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    phone: '',
    password: '',
    email: '',
    name: '',
    role: 'censor', // Automatically set to 'censor'
    status: true,   // Automatically set to true
  });

  const handleChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://6692a166346eeafcf46da14d.mockapi.io/account', staff);
      alert('Nhân viên đã được thêm thành công!');
      navigate('/staff'); // Navigate back to staff list after adding new staff
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Có lỗi xảy ra khi thêm nhân viên.');
    }
  };

  return (
    <div className='addstaff'>
      <h1>Tạo tài khoản người kiểm duyệt</h1>
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
          <button type="submit">Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;

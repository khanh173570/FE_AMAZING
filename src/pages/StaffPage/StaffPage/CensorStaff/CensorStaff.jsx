import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Censorstaff.css';
import { AiOutlineSearch, AiOutlineEdit, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account');
        setStaff(response.data);
        setFilteredStaff(response.data); // Initially set filtered staff to all staff members
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = staff.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhân viên này không?')) {
      try {
        await axios.delete(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`);
        const updatedStaff = staff.filter(member => member.id !== id);
        setStaff(updatedStaff);
        setFilteredStaff(updatedStaff); // Update filtered staff as well
        alert('Nhân viên đã được xóa thành công.');
      } catch (error) {
        console.error("Error deleting staff:", error);
        alert('Có lỗi xảy ra khi xóa nhân viên.');
      }
    }
  };

  return (
    <div className='stafftable'>
      <div className="stafftable-top">
        <h1>Danh sách người kiểm duyệt</h1>
        <hr />
        <div className="stafftable-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder='Nhập từ khóa tìm kiếm'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}><AiOutlineSearch /></button>
          </div>
          <div className="add-staff-btn">
            <Link to="/staff/addstaff">
              <AiOutlinePlus /> Thêm người kiểm duyệt
            </Link>
          </div>
        </div>
      </div>
      <div className="stafftable-table">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/staff/edit/${member.id}`}>
                      <AiOutlineEdit />
                    </Link>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(member.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;

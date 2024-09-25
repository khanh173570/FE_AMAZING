import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Censorstaff.css';
import { AiOutlineSearch, AiOutlineEdit, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null); // For showing staff details in modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal visibility for details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account');
        const censorStaff = response.data.filter(member => member.role === 'censor');
        setStaff(censorStaff);
        setFilteredStaff(censorStaff);
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

  const openConfirmModal = (id) => {
    setSelectedStaffId(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedStaffId(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://6692a166346eeafcf46da14d.mockapi.io/account/${selectedStaffId}`);
      const updatedStaff = staff.filter(member => member.id !== selectedStaffId);
      setStaff(updatedStaff);
      setFilteredStaff(updatedStaff);
      alert('Nhân viên đã được xóa thành công.');
      closeConfirmModal();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert('Có lỗi xảy ra khi xóa nhân viên.');
    }
  };

  // Open staff details modal
  const openDetailsModal = (staff) => {
    setSelectedStaff(staff); // Set the selected staff data
    setShowDetailsModal(true); // Show the modal
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false); // Hide the modal
    setSelectedStaff(null); // Clear the selected staff data
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
                <td>
                  <span className="name-btn" onClick={() => openDetailsModal(member)}>
                    {member.name}
                  </span>
                </td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/staff/editstaff/${member.id}`}>
                      <AiOutlineEdit />
                    </Link>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => openConfirmModal(member.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h3>Bạn có chắc muốn xóa nhân viên này không?</h3>
            <div className="confirm-modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>Xóa</button>
              <button className="cancel-btn" onClick={closeConfirmModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Details Modal */}
      {showDetailsModal && selectedStaff && (
        <div className="details-modal">
          <div className="details-modal-content">
            <h2>Chi tiết nhân viên</h2>
            <p><strong>Tên:</strong> {selectedStaff.name}</p>
            <p><strong>Email:</strong> {selectedStaff.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedStaff.phone}</p>
            <p><strong>Vai trò:</strong> {selectedStaff.role}</p>
            <button className="close-btn" onClick={closeDetailsModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTable;

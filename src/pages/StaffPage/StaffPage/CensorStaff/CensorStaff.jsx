import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CensorStaff.css';
import { AiOutlineSearch, AiOutlineEdit, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showDeleteAllConfirmModal, setShowDeleteAllConfirmModal] = useState(false); // Confirmation modal for "Delete All"
  const [selectedStaff, setSelectedStaff] = useState(null); // For showing staff details in modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal visibility for details
  const [pickedStaff, setPickedStaff] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      setPickedStaff(filteredStaff.map((member) => member.id)); // Pick all staff
    } else {
      setPickedStaff([]); // Unpick all staff
    }
  };

  // Handle picking/deselecting individual staff checkboxes in the <td>
  const handlePickStaff = (id) => {
    if (pickedStaff.includes(id)) {
      setPickedStaff(pickedStaff.filter(staffId => staffId !== id)); // Unpick staff
    } else {
      setPickedStaff([...pickedStaff, id]); // Pick staff
    }
  };

  const isAllPicked = filteredStaff.length > 0 && pickedStaff.length === filteredStaff.length;

  // Open staff details modal
  const openDetailsModal = (staff) => {
    setSelectedStaff(staff); // Set the selected staff data
    setShowDetailsModal(true); // Show the modal
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false); // Hide the modal
    setSelectedStaff(null); // Clear the selected staff data
  };

  const openDeleteAllConfirmModal = () => {
    setShowDeleteAllConfirmModal(true);
  };

  const closeDeleteAllConfirmModal = () => {
    setShowDeleteAllConfirmModal(false);
  };

  // Function to delete all selected staff members
  const deleteAllPickedStaff = async () => {
    try {
      await Promise.all(
        pickedStaff.map(id => axios.delete(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`))
      );
      const updatedStaff = staff.filter(member => !pickedStaff.includes(member.id));
      setStaff(updatedStaff);
      setFilteredStaff(updatedStaff);
      setPickedStaff([]); // Clear the picked staff after deletion
      alert('Tất cả nhân viên đã được xóa thành công.');
      closeDeleteAllConfirmModal();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert('Có lỗi xảy ra khi xóa các nhân viên.');
    }
  };

  return (
    <div className='stafftable'>
      <div className="stafftable-top">
        <h1>Danh sách người kiểm duyệt</h1>
        <hr />
        <div className="stafftable-actions">
          <div className="search-bar-staff">
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
        <table className='stafftable-table-section'>
          <thead className='stafftable-thead-section'>
            <tr className='stafftable-tr-section'>
              {/* Pick All checkbox in the header */}
              <th className='producttable-first-row' style={{ textAlign: 'center' }}>
                <input
                  className='stafftable-checkbox'
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllPicked}
                />
              </th>
              <th className='producttable-first-row'>Tên</th>
              <th className='producttable-first-row'>Email</th>
              <th className='producttable-first-row'>Số điện thoại</th>
              <th className='producttable-first-row'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((member) => (
              <tr key={member.id}>
                <td className='stafftable-second-row' data-label='Chọn' style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    className='producttable-checkbox'
                    checked={pickedStaff.includes(member.id)}
                    onChange={() => handlePickStaff(member.id)}
                  />
                </td>
                <td className='stafftable-second-row' data-label="Tên">
                  <span className="name-btn" onClick={() => openDetailsModal(member)}>
                    {member.name}
                  </span>
                </td>
                <td className='stafftable-second-row' data-label="Email">{member.email}</td>
                <td className='stafftable-second-row' data-label="Số điện thoại">{member.phone}</td>
                <td className='stafftable-second-row' data-label="Hành động">
                  <Tooltip title="Chỉnh sửa" arrow>
                    <button className="edit-btn">
                      <Link to={`/staff/editstaff/${member.id}`}>
                        <AiOutlineEdit />
                      </Link>
                    </button>
                  </Tooltip>

                  <Tooltip title="Xóa" arrow>
                    <button
                      className="delete-btn"
                      onClick={() => openConfirmModal(member.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Picked staff count, always visible */}
        <div className="picked-count">
          <p>{pickedStaff.length} nhân viên đã được chọn</p>
          <button
            className={`delete-all-btn ${pickedStaff.length === 0 ? 'disabled' : ''}`}
            onClick={openDeleteAllConfirmModal}
            disabled={pickedStaff.length === 0}>
            Xóa tất cả
          </button>
        </div>

      </div>

      {/* Confirmation Modal */}
      {
        showConfirmModal && (
          <div className="confirm-modal">
            <div className="confirm-modal-content">
              <h3>Bạn có chắc muốn xóa nhân viên này không?</h3>
              <div className="confirm-modal-actions">
                <button className="confirm-btn" onClick={confirmDelete}>Xóa</button>
                <button className="cancel-btn" onClick={closeConfirmModal}>Hủy</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Confirmation Modal for Deleting All */}
      {
        showDeleteAllConfirmModal && (
          <div className="confirm-modal">
            <div className="confirm-modal-content">
              <h3>Bạn có chắc muốn xóa tất cả nhân viên đã chọn không?</h3>
              <div className="confirm-modal-actions">
                <button className="confirm-btn" onClick={deleteAllPickedStaff}>Xóa tất cả</button>
                <button className="cancel-btn" onClick={closeDeleteAllConfirmModal}>Hủy</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Staff Details Modal */}
      {
        showDetailsModal && selectedStaff && (
          <div className="details-modal">
            <div className="tabbar1">
              <h3>Thông tin nhân viên</h3>
              <span className="close1" onClick={closeDetailsModal}>&times;</span>
            </div>
            <div className="details-modal-content">
              <div className="detail-left">
                <div>
                  <label>Tên nhân viên</label>
                  <input type="text" className='readonly-section' value={selectedStaff.name} readOnly />
                </div>
                <div>
                  <label>Email</label>
                  <input type="text" className='readonly-section' value={selectedStaff.email} readOnly />
                </div>
              </div>

              <div className="detail-right">
                <div>
                  <label>Số điện thoại</label>
                  <input type="text" className='readonly-section' value={selectedStaff.phone} readOnly />
                </div>
                <div>
                  <label>Vai trò</label>
                  <input type="text" className='readonly-section' value={selectedStaff.role} readOnly />
                </div>
              </div>
            </div>

            <div className="modal-buttons1">
              <button className='edit-button1'>
                <Link to={`/staff/editstaff/${selectedStaff.id}`}>
                  Chỉnh sửa
                </Link>
              </button>
              <button
                className="delete-btn1"
                onClick={() => openConfirmModal(selectedStaff.id)}>
                Xóa
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default StaffTable;

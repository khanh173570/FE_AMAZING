import React, { useState } from 'react';
import CensorStaff from '../CensorStaff/CensorStaff'
import { Link } from 'react-router-dom'
import { LuPackageOpen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import './CensorStaffPage.css'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const CensorStaffPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  const handleLogout = () => {
    localStorage.removeItem("account");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  return (
    <div className="staffpage">
      <div className={`sidenav ${isSidebarOpen ? 'open' : 'closed'}`}>
        {/* Sidebar toggle button */}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>

        <ul className="sidenav-top">
          <li>
            <Link to="/staff">
              <LuPackageOpen className="icon" />
              <span className="link-text">{isSidebarOpen && 'Sản phẩm'}</span>
            </Link>
          </li>
          <li>
            <Link to="/staff/censorstaff">
              <FaRegUser className="icon" />
              <span className="link-text">{isSidebarOpen && 'Người kiểm duyệt'}</span>
            </Link>
          </li>
        </ul>

        <ul className="sidenav-bottom">
          <li>
            <Link to="#" onClick={handleLogout}>
              <MdOutlineLogout className="icon" />
              <span className="link-text">{isSidebarOpen && 'Đăng xuất'}</span>
            </Link>
          </li>
        </ul>
      </div>
      <CensorStaff />
    </div>
  )
}

export default CensorStaffPage

import React from 'react'
import CensorStaff from '../CensorStaff/CensorStaff'
import { Link } from 'react-router-dom'
import { LuPackageOpen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import './CensorStaffPage.css'

const CensorStaffPage = () => {
  return (
    <>
      <div className="staffpage">
        <div className='sidenav'>
          <ul className='sidenav-top'>
            <li><Link to="/staff"><LuPackageOpen />Sản phẩm</Link></li>
            <li><Link to="/staff/censorstaff"><FaRegUser />Người kiểm duyệt</Link></li>
          </ul>
          <ul className='sidenav-bottom'>
            <li><Link to="/login"><MdOutlineLogout />Đăng xuất</Link></li>
          </ul>
        </div>
        <CensorStaff />
      </div>
    </>
  )
}

export default CensorStaffPage

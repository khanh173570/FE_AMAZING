import React from 'react'
import './StaffPage.css'
import { Link } from 'react-router-dom'
import { LuPackageOpen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import ProductTable from '../StaffPage/ProductTable/ProductTable';

function StaffPage() {
  return (
    <>
      <div className="staffpage">
        <div className='sidenav'>
          <ul className='sidenav-top'>
            <li><Link to="/staff"><LuPackageOpen />Sản phẩm</Link></li>
            <li><Link to="/staff/censorstaff"><FaRegUser />Người kiểm duyệt</Link></li>
          </ul>
          <ul className='sidenav-bottom'>
            <li><Link to="/info"><IoInformationCircleOutline />Thông tin nhân viên</Link></li>
            <li><Link to=""><MdOutlineLogout />Đăng xuất</Link></li>
          </ul>
        </div>
        <ProductTable />
      </div>
    </>

  )
}

export default StaffPage
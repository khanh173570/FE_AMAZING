import React from 'react'
import { Link } from 'react-router-dom'
import { LuPackageOpen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import ProductEdit from '../ProductEdit/ProductEdit';
import './ProductEditPage.css'

const ProductEditPage = () => {
  return (
    <div>
      <div className="staffpage">
        <div className='sidenav'>
          <ul className='sidenav-top'>
            <li><Link to="/staff"><LuPackageOpen />Sản phẩm</Link></li>
            <li><Link to="/staff/censorstaff"><FaRegUser />Người kiểm duyệt</Link></li>
          </ul>
          <ul className='sidenav-bottom'>
            <li><Link to="/staff/info"><IoInformationCircleOutline />Thông tin nhân viên</Link></li>
            <li><Link to="/login"><MdOutlineLogout />Đăng xuất</Link></li>
          </ul>
        </div>
        <ProductEdit/>
      </div>
    </div>
  )
}

export default ProductEditPage

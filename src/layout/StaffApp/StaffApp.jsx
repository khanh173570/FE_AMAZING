import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/componentStaff/Footer/FooterStaff.jsx';
import Header from '../../components/componentStaff/Header/HeaderStaff.jsx';

const StaffApp = () => {
  return (
    <div>
      <div className="all">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
    </div>
  )
}

export default StaffApp

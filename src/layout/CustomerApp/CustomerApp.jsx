import { Outlet } from 'react-router-dom';
import Footer from '../../components/componentCustomer/Footer/FooterCustomer.jsx';
import Header from '../../components/componentCustomer/Header/HeaderCustomer.jsx';
import React from 'react';
import './CustomerApp.css'; // Import CSS để định dạng

function CustomerApp() {
  return (
    <div className="container">
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
  );
}

export default CustomerApp;

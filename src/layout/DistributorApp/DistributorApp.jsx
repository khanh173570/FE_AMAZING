import HeaderDistributor from './../../components/componentDistributor/Header/HeaderDistributor';
import FooterDistributor from './../../components/componentDistributor/Footer/FooterDistributor';
import { Outlet } from 'react-router-dom';
import React from 'react';




function DistributorApp() {
  return (
    <div className="all">
      <header className="header">
        <HeaderDistributor />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <FooterDistributor />
      </footer>
    </div>
  );
}

export default DistributorApp;

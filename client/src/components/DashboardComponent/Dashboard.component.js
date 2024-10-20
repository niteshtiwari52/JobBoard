import React from 'react';
import DashboardNavbarcomponent from '../NavbarComponent/DashboardNavbar.component';
import SideBarcomponent from './SideBar.component';
import MainWindowcomponent from './MainWindow.component';

const Dashboardcomponent = () => {
  return (
    <>
      <DashboardNavbarcomponent />
      <div className="flex">
        <SideBarcomponent />
        <div className="flex-1 p-8"> 
          <MainWindowcomponent />
        </div>
      </div>
    </>
  );
};

export default Dashboardcomponent;

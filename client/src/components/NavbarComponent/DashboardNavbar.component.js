import React from "react";
import Profilecomponent from "../DashboardComponent/Profile.component";

const DashboardNavbarcomponent = () => {
  return (
    <nav className="bg-white border-[#C5C5C5] border-b-[1px] px-8 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="/NavLogo.png"
          alt="Logo"
          className="w-40 h-11 object-contain"
        />
      </div>

      <div className="flex items-center gap-6">
        <a
          href="/contacts"
          className="text-[#576474] text-xl font-medium hover:text-gray-500 transition duration-300"
        >
          Contacts
        </a>

        <Profilecomponent />
      </div>
    </nav>
  );
};

export default DashboardNavbarcomponent;

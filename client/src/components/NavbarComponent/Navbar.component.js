import React from "react";

const Navbarcomponent = () => {
  return (
    <nav className="bg-white p-4  flex justify-between items-center ">
      <div className="flex items-center space-x-2">
        <img
          src="/NavLogo.png"
          alt="Logo"
          className="w-40 h-11 object-contain"
        />
      </div>

      <div>
        <a
          href="/contacts"
          className="text-[#576474] text-xl font-medium hover:text-gray-500 transition duration-300"
        >
          Contacts
        </a>
      </div>
    </nav>
  );
};

export default Navbarcomponent;

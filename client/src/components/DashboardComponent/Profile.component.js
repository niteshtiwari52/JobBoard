import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profilecomponent = () => {
  const user = useSelector(state => state.user.selfUser);
  const [isOpen, setIsOpen] = useState(false);

  const profileOption = [
    {
      id: "1",
      name: "Profile",
    },
    {
      id: "2",
      name: "Settings",
    },
    {
      id: "3",
      name: "Log Out",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <div className="flex items-center justify-center  rounded-full w-10 h-10 mr-2">
          <FaCircle className="text-[#83909F]" />
        </div>

        <span className="text-gray-600 text-sm">{user?.company?.owner || 'Your Name'}</span>

        <FaCaretDown className="ml-2 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            {profileOption.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profilecomponent;

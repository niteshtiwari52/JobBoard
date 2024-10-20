import React from 'react';
import { GoHomeFill } from 'react-icons/go';

const SideBarcomponent = () => {
  return (
    <div className="w-16 h-screen border-[#C5C5C5] border-r-[1px] bg-white flex flex-col items-center py-8">
      <div className="text-[#576474] mb-8">
        <GoHomeFill size={30} />
      </div>
    </div>
  );
};

export default SideBarcomponent;

import React from 'react';
import { SIDE_MENU_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ activeMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-white border-b border-gray-200/50 p-5 sticky top-[61px] z-20 h-[calc(100vh-61px)]">
      {SIDE_MENU_DATA.map((menu, index) => (
        <button
          onClick={() => {
            navigate(menu.path);
          }}
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-6 px-3 rounded-lg mb-3 transition-all duration-200 ${activeMenu === menu.label ? 'bg-[#3be477] text-white font-medium shadow-md hover:bg-[#3be477]' : 'hover:bg-gray-100'}`}
        >
          <menu.icon className="text-xl" />
          {menu.label}
        </button>
      ))}
    </div>
  );
};

export default SideBar;

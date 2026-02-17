import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Menu, X, LogOut, User } from 'lucide-react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SideBar from './SideBar.jsx';
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success('Logged Out');
    navigate('/login');
  };
  return (
    <div className="flex items-center justify-between w-full h-16 border-b-2 border-gray-200  px-10">
      <div className="flex items-center gap-5 ">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
            console.log(openSideMenu);
          }}
          className="block  text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-5">
          <img src={assets.logo} alt="" className="w-12 h-12" />
          <p className="text-2xl font-bold text-black">Musify</p>
        </div>
      </div>

      {/* User Section */}
      <div className="flex gap-5">
        <div className="flex items-center gap-4 bg-gray-200 rounded-lg p-2">
          <User className="w-4 " />

          {user && (
            <span className=" items-center text-sm text-gray-500 hidden sm:block ">
              {user.email}
            </span>
          )}
          <span className="text-sm text-green-500 bg-green-200 rounded-lg p-1">
            {user.role}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-200 text-red-500 text-sm rounded-lg px-2 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
      {openSideMenu && (
        <div className="fixed top-[64px] left-0 w-64 bg-white border-r border-gray-200 z-20">
          <SideBar activeMenu={activeMenu} />
        </div>
      )}
      <></>
    </div>
  );
};

export default Navbar;

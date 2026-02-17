import Sidebar from './SideBar';
import Navbar from './NavBar';

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen">
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="hidden lg:block w-64">
          <Sidebar activeMenu={activeMenu} />
        </div>
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;

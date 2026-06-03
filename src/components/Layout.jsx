import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function Layout() {
  return (
    <div className='bg-blue950 min-h-screen lg:flex lg:flex-row lg:h-screen'>
      <NavBar />
      <main className='lg:flex-1 lg:overflow-y-auto lg:p-8 max-w-7xl mx-auto scrollbar-thumb-blue-500 scrollbar-track-blue900 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

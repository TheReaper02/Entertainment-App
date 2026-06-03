import { NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../assets/icon-nav-home.svg";
import moviesIcon from "../assets/icon-nav-movies.svg";
import SeriesIcon from "../assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../assets/icon-nav-bookmark.svg";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import { CurrentUserContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

function NavBar() {
  const { currentUser, logout } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    <nav className='bg-blue900 flex items-center justify-between p-6 md:px-8 md:rounded-lg md:mx-6 md:my-6 lg:flex-col lg:min-h-[90vh]'>
      <div className='w-10 h-10 flex items-center justify-center md:w-12 md:h-12 lg:w-16 lg:h-16 lg:mb-10'>
        <img src={logo} alt='Logo' />
      </div>
      <ul className='flex gap-6 items-center md:gap-8 lg:flex-col lg:gap-10'>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100"
                : "opacity-40 hover:opacity-100 transition-opacity"
            }
            to='/'>
            <img src={homeIcon} alt='Home' className='w-6 h-6' />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100"
                : "opacity-40 hover:opacity-100 transition-opacity"
            }
            to='/movies'>
            <img src={moviesIcon} alt='Movies' className='w-6 h-6' />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100"
                : "opacity-40 hover:opacity-100 transition-opacity"
            }
            to='/tv-series'>
            <img src={SeriesIcon} alt='Series' className='w-6 h-6' />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100"
                : "opacity-40 hover:opacity-100 transition-opacity"
            }
            to='/bookmarked'>
            <img src={bookmarkIcon} alt='Bookmarks' className='w-6 h-6' />
          </NavLink>
        </li>
      </ul>
      {currentUser && (
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className='cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-white md:w-12 md:h-12 lg:w-16 lg:h-16 lg:mt-auto lg:mb-6'>
          <img
            src={avatar}
            alt='User Avatar'
            className='w-full h-full object-cover'
          />
        </button>
      )}
    </nav>
  );
}

export default NavBar;

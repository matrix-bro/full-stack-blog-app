import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/authSlice";
import { displayAlert } from "../redux/features/alertSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 py-2 border-gray-200 bg-gray-900 border-b z-10 uppercase">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white capitalize">
              Blog App
            </span>
          </Link>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 tracking-wide"
            id="navbar-user"
          >
            <ul className="flex flex-col text-sm font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                >
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("token") ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog/new"
                      className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                    >
                      New Post
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                      onClick={() => {
                        dispatch(logout());
                        dispatch(
                          displayAlert({
                            alertType: "info",
                            message: "Logged out successfully.",
                          })
                        );
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent border-gray-700"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";

import { Menu, X } from "lucide-react";
import ProfileImg from "@/assets/images/profile.png";
import Button from "../atoms/buttons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import NewLink from "../atoms/link/Link";

interface NavTheme {
  theme: "dark" | "light";
}

const Navbar = ({ theme }: NavTheme) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const NavTo = (route: string) => {
    navigate(route);
  };

  const { loginWithRedirect, logout, isLoading, user } = useAuth0();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userToken");
  };
  return (
    <nav
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sticky top-0 z-50 overflow-none ${
        theme === "dark" ? "bg-[#030811] text-white" : "bg-white text-black"
      }`}
    >
      <Link to="/" className="flex-shrink-0">
        <img src="none" alt="Bite Scout" />
      </Link>
      {/* web view */}
      <ul className="hidden md:flex ml-10 flex items-center h-full">
        <li>
          <NewLink to="/" text="Home" />
        </li>
        <li>
          <NewLink to="/about" text="About" />
        </li>
        <li>
          <NewLink to="/service" text="Services" />
        </li>
        <li>
          <NewLink to="/contact" text="Contact" />
        </li>

        <li>
          {!isLoading && user && (
            <ul className="auth flex ml-20 items-center gap-2">
              <li>
                <Button
                  onClick={() => NavTo("/dashboard")}
                  variant="plain"
                  text="Dashboard"
                  size="sm"
                />
              </li>
              <li>
                <Button
                  onClick={() => handleLogout()}
                  text="Logout"
                  size="sm"
                  variant="plain"
                />
              </li>
              <li className="h-full w-10 rounded-xl">
                <img
                  src={ProfileImg}
                  alt="profile image"
                  className="object-center w-full h-full"
                />
              </li>
            </ul>
          )}
          {!isLoading && !user && (
            <ul className="flex items-center gap-2 ml-10">
              <li>
                <Button
                  onClick={() =>
                    loginWithRedirect({
                      appState: {
                        returnTo: location.pathname,
                      },
                    })
                  }
                  text="Log In"
                  size="sm"
                  variant="plain"
                />
              </li>
              <li>
                <Button
                  onClick={() => NavTo("/register")}
                  text="Register"
                  size="sm"
                  variant="plain"
                />
              </li>
            </ul>
          )}
        </li>
      </ul>
      <button
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* mobile view */}
      {isOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden w-full h-[100vh] space-y-1 sm:px-3 absolute top-20 right-0 bg-white text-black animate__animated animate__slideInLeft"
        >
          <li>
            <Link
              to="/"
              onClick={toggleMenu}
              className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white "
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              onClick={toggleMenu}
              className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white "
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white"
            >
              Contact
            </Link>
          </li>
          <li>
            {!isLoading && user && (
              <ul className="auth flex flex-col items-start w-[100vw]">
                <li className="w-full">
                  <Link
                    className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white"
                    to="/dashboard"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}{" "}
            {!isLoading && !user && (
              <ul className="flex items-center gap-4 ml-10">
                <li>
                  <button
                    className="px-4 py-2 bg-red text-white rounded-lg"
                    type="button"
                    onClick={() =>
                      loginWithRedirect({
                        appState: {
                          returnTo: location.pathname,
                        },
                      })
                    }
                  >
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 bg-green-800 text-white rounded-lg"
                    type="button"
                  >
                    Register
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaLeaf, FaUserPlus, FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 
        bg-gray-800 bg-opacity-60 backdrop-blur-xl shadow-lg 
        border border-green-400 border-opacity-30 transition-all duration-500">
        
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-extrabold tracking-wide flex items-center"
          >
            <FaLeaf className="text-green-400 mr-2 animate-pulse" />
            <span className="text-green-300">Organic</span>Sikkim
          </motion.div>

          {/* Navbar Links (Desktop) */}
          <ul className="hidden md:flex space-x-6 text-base md:text-lg font-semibold text-white">
            {["Home", "Shop", "Gallery", "Contact"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                <Link
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer navbar-hover transition-all"
                >
                  {item}
                </Link>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-green-400 rounded-full group-hover:w-full transition-all duration-300"></span>
              </motion.li>
            ))}
          </ul>

          {/* Show Cart Icon Only If Logged In */}
          {isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl md:text-2xl text-white p-2 transition-all duration-300"
            >
              <FaShoppingCart />
            </motion.button>
          )}

          {/* Login / Signup Buttons (Only if NOT logged in) */}
          {!isLoggedIn ? (
            <div className="hidden md:flex space-x-4">
              <motion.button
                onClick={() => setLoginOpen(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-2 py-5 md:px-6 md:py-1 rounded-full border border-blue-400 text-blue-400 
                font-bold shadow-md hover:shadow-blue-500 transition-all text-sm md:text-base"
              >
                <FaSignInAlt className="mr-2 text-lg" />
                Login
              </motion.button>
              <motion.button
                onClick={() => setSignupOpen(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-8 py-0.5 md:px-6 md:py-0.5 rounded-full border border-pink-400 text-pink-400 
                font-bold shadow-md hover:shadow-pink-500 transition-all text-sm md:text-base"
              >
                <FaUserPlus className="mr-5 text-lg" /> Sign Up
               
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-5 py-2 rounded-full bg-red-600 text-white 
              font-bold shadow-md hover:shadow-red-500 transition-all"
            >
              Logout
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-2xl text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Navbar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-[4rem] left-1/2 -translate-x-1/2 w-[85%] 
              rounded-lg shadow-lg bg-gray-800 bg-opacity-70 backdrop-blur-md p-4 
              transition-all flex flex-col items-center"
            >
              {["Home", "Shop", "Gallery", "Contact"].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group w-full text-center"
                >
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    className="block py-2 text-base font-medium text-white navbar-hover transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Login/Signup Buttons */}
              {!isLoggedIn ? (
                <div className="flex flex-col w-40 space-y-2 mt-4">
                  <motion.button
                    onClick={() => setLoginOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    className="border border-blue-400 text-blue-400 px-2 py-2
                    rounded-full font-bold shadow-md hover:shadow-blue-500 transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => setSignupOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    className="border border-pink-400 text-pink-400 px-4 py-2 
                    rounded-full font-bold shadow-md hover:shadow-pink-500 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 
                  rounded-full hover:bg-red-700 transition mt-4 w-full font-bold 
                  shadow-md hover:shadow-red-500"
                >
                  Logout
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <SignupModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}

export default Navbar;

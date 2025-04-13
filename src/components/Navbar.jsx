/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar({ isOpen, onClose, isMobile }) {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/add-habit', icon: PlusCircle, label: 'Add Habit' },
  ];
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  // Sync isMenuOpen with isOpen prop
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onClose();
  };

  const navbarVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const navbarContent = (
    <div className="flex items-center justify-between w-full">
      <NavLink to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        HabitSpark
      </NavLink>
      <nav className="flex items-center space-x-4">
        {isMobile ? (
          <>
            <button
              onClick={handleToggle}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={navbarVariants}
                >
                  <div className="flex flex-col p-4">
                    {navItems.map(({ to, icon: Icon, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={() => {
                          setIsMenuOpen(false);
                          onClose();
                        }}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`
                        }
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {label}
                      </NavLink>
                    ))}
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
                          : 'bg-indigo-200 hover:bg-indigo-300 text-gray-800'
                      }`}
                    >
                      {theme === 'light' ? <Moon size={20} className="mr-3" /> : <Sun size={20} className="mr-3" />}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
                  : 'bg-indigo-200 hover:bg-indigo-300 text-gray-800'
              }`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </>
        )}
      </nav>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">{navbarContent}</div>
    </div>
  );
}
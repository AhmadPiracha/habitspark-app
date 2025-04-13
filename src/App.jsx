import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import AppRoutes from './Routes';
import { scheduleReminder } from './utils/habitUtils';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  );
}

function Main() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Schedule reminders for habits with reminders enabled
  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.forEach(habit => {
      if (habit.reminderEnabled && habit.reminderTime) {
        scheduleReminder(habit.id, habit.name, habit.reminderTime);
      }
    });
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 mt-4">
      <Toaster position="top-right" />
      <Navbar isOpen={isNavbarOpen} onClose={() => setIsNavbarOpen(false)} isMobile={isMobile} />
      <div className="flex-grow">
        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
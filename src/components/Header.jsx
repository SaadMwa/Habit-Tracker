import React from 'react';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="relative w-full max-w-md mb-6">
      <h1 className="text-4xl font-bold text-center">My Habit Tracker</h1>
      <button
        onClick={toggleDarkMode}
        className="absolute top-0 right-0 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition transform hover:scale-110 shadow-md"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default Header;

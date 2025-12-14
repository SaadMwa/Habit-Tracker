import React from 'react';

function HabitInput({ newHabit, setNewHabit, addHabit, darkMode }) {
  return (
    <div className="flex mb-6 w-full max-w-md">
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Add a new habit"
        className={`flex-1 p-3 rounded-l-lg transition focus:outline-none focus:ring-1
          ${darkMode 
            ? 'bg-gray-800 text-gray-100 border border-gray-700 focus:ring-indigo-500' 
            : 'bg-gray-100 text-gray-900 border border-gray-300 focus:ring-indigo-600'}`}
      />
      <button
        onClick={addHabit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-6 transition transform hover:scale-105"
      >
        Add
      </button>
    </div>
  );
}

export default HabitInput;

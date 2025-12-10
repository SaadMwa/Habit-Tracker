import React, { useState, useEffect } from 'react';

function Tracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(stored);
    setLoaded(true);
  }, []);


  useEffect(() => {
    if (loaded) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits, loaded]);

  const addHabit = () => {
    if (newHabit.trim() === "") {
      alert("Type Habit");
      return;
    }
    const habitObj = {
      id: Date.now(),
      name: newHabit,
      streak: 0,
      lastCompleted: null
    };
    setHabits(prev => [...prev, habitObj]);
    setNewHabit("");
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const markDone = (id) => {
    const today = new Date().toDateString();
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        if (h.lastCompleted === today) return h;
        return { ...h, streak: h.streak + 1, lastCompleted: today };
      }
      return h;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-4xl text-white font-bold mb-6 animate-pulse">
        🌙 My Habit Tracker
      </h1>

      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit"
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={addHabit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-lg transition transform hover:scale-105"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-4">
        {habits.map(h => (
          <li
            key={h.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div>
              <p className="text-white font-semibold text-lg">{h.name}</p>
              <p className="text-gray-400 text-sm">Streak: {h.streak}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => markDone(h.id)}
                className={`px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
                  h.lastCompleted === new Date().toDateString() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={h.lastCompleted === new Date().toDateString()}
              >
                Done
              </button>
              <button
                onClick={() => deleteHabit(h.id)}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracker;

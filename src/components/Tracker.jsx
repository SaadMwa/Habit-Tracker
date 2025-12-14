import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import Header from './Header';
import HabitInput from './HabitInput';
import HabitItem from './HabitItem';
import HabitChart from './HabitChart';

function Tracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', JSON.stringify(!prev));
      return !prev;
    });
  };

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
    if (!newHabit.trim()) return;
    const habitObj = { id: Date.now(), name: newHabit, completedDates: [] };
    setHabits(prev => [...prev, habitObj]);
    setNewHabit("");
  };

  const deleteHabit = (id) => setHabits(prev => prev.filter(h => h.id !== id));

  const markDone = (id) => {
    const today = new Date().toDateString();
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        if (!h.completedDates) h.completedDates = [];
        if (h.completedDates.includes(today)) return h;
        return { ...h, completedDates: [...h.completedDates, today] };
      }
      return h;
    }));
  };

  const startEdit = (id, name) => { setEditingId(id); setEditingText(name); };
  const saveEdit = (id) => { setHabits(prev => prev.map(h => h.id === id ? { ...h, name: editingText } : h)); setEditingId(null); setEditingText(""); };

  return (
 <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300 min-h-screen flex flex-col items-center p-6`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HabitInput newHabit={newHabit} setNewHabit={setNewHabit} addHabit={addHabit} darkMode={darkMode} />

      <ul className="w-full max-w-md space-y-4">
        <AnimatePresence>
          {habits.map(h => (
            <HabitItem
              key={h.id} // important for AnimatePresence
              habit={h}
              darkMode={darkMode}
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
              startEdit={startEdit}
              saveEdit={saveEdit}
              markDone={markDone}
              deleteHabit={deleteHabit}
            />
          ))}
        </AnimatePresence>
      </ul>

      <HabitChart habits={habits} darkMode={darkMode} />
    </div>
  );
}

export default Tracker;

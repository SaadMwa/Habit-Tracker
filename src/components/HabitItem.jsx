import React from "react";
import { motion } from "framer-motion";

function HabitItem({
  habit,
  darkMode,
  editingId,
  editingText,
  setEditingText,
  startEdit,
  saveEdit,
  markDone,
  deleteHabit,
}) {
  const today = new Date().toDateString();
  const doneToday = habit.completedDates.includes(today);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-5 rounded-lg flex justify-between items-center shadow-lg transition transform hover:shadow-2xl hover:-translate-y-1 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div>
        {/* Habit Name / Editing Input */}
        {editingId === habit.id ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="p-1 rounded border focus:outline-none"
          />
        ) : (
          <p
            className={`font-semibold text-lg ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {habit.name}
          </p>
        )}

        <motion.p
          key={habit.completedDates.length}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.3 }}
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Completed: {habit.completedDates.length}
        </motion.p>
      </div>

      <div className="flex space-x-2">
        {/* Done Button with animation */}
        <motion.button
          onClick={() => markDone(habit.id)}
          whileTap={{ scale: 1.2 }}
          animate={{
            backgroundColor: doneToday
              ? "#16a34a"
              : darkMode
              ? "#2563eb"
              : "#4f46e5",
          }}
          className="px-3 py-1 rounded text-white transition"
          disabled={doneToday}
        >
          Done
        </motion.button>

        {/* Edit / Save Buttons */}
        {editingId === habit.id ? (
          <button
            onClick={() => saveEdit(habit.id)}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => startEdit(habit.id, habit.name)}
            className="px-3 py-1 rounded bg-yellow-500 text-white"
          >
            Edit
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => deleteHabit(habit.id)}
          className="px-3 py-1 rounded bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
}

export default HabitItem;

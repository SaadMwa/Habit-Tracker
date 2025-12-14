import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HabitChart({ habits, darkMode }) {
  const chartData = habits.map(h => ({
    name: h.name,
    streak: h.completedDates ? h.completedDates.length : 0
  }));

  return (
    <div className={`w-full max-w-md mt-8 p-4 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <h2 className="text-white font-semibold mb-2">Habit Streaks</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#111"} />
          <YAxis stroke={darkMode ? "#fff" : "#111"} />
          <Tooltip />
          <Bar dataKey="streak" fill={darkMode ? "#4f46e5" : "#6366f1"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HabitChart;

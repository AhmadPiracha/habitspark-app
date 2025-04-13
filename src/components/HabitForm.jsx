import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, Save, X, Clock, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { scheduleReminder } from '../utils/habitUtils';

export default function HabitForm({ initialHabit = {}, onSubmit, isEdit = false }) {
  const [habitName, setHabitName] = useState(initialHabit.name || '');
  const [reminderEnabled, setReminderEnabled] = useState(initialHabit.reminderEnabled || false);
  const [reminderTime, setReminderTime] = useState(initialHabit.reminderTime || '09:00');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      toast.error('Habit name is required');
      return;
    }

    const updatedHabit = {
      ...initialHabit,
      name: habitName,
      reminderEnabled,
      reminderTime: reminderEnabled ? reminderTime : null,
    };

    if (!isEdit) {
      updatedHabit.id = Date.now();
      updatedHabit.progress = 0;
      updatedHabit.progressLog = [];
      updatedHabit.streak = 0;
    }

    onSubmit(updatedHabit);

    if (reminderEnabled) {
      scheduleReminder(updatedHabit.id, updatedHabit.name, reminderTime);
    }

    toast.success(isEdit ? 'Habit updated successfully' : 'Habit created successfully');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl my-2 mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg shadow-lg p-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
            alt={isEdit ? "Edit habit" : "Create new habit"}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h1
            className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isEdit ? 'Edit Habit' : 'Create New Habit'}
          </h1>
          <p
            className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {isEdit ? 'Update your habit details' : 'Define your new habit and start tracking your progress'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Habit Name
            </label>
            <div className="relative">
              <Target
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-black border-gray-300'
                }`}
                placeholder="e.g., Daily Exercise"
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Daily Reminder
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Enable daily reminder
              </span>
            </div>
            {reminderEnabled && (
              <div className="mt-4 relative">
                <Clock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`}
                />
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-white text-black border-gray-300'
                  }`}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEdit ? <Edit2 className="h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
              {isEdit ? 'Update Habit' : 'Create Habit'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
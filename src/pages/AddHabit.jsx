import HabitForm from '../components/HabitForm';

export default function AddHabit() {
  const handleSubmit = (newHabit) => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    const updatedHabits = [...storedHabits, newHabit];
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return <HabitForm onSubmit={handleSubmit} />;
}
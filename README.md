# Habit Tracker Application

A feature-rich, frontend-only habit tracking application built with React. Track habits with progress, streaks, milestones, and daily reminders, all stored locally using localStorage. The app features a responsive navbar, light/dark themes, and visual progress charts.

## Features

- Create, edit, and delete habits stored in localStorage
- Update habit progress (0%, 25%, 50%, 75%, 100%)
- Track streaks (consecutive days at 100% progress)
- Celebrate streak milestones (7, 30, 100 days) with toasts
- Enable daily reminders with browser notifications
- Visualize habit progress with charts
- Responsive navbar with light/dark theme toggle
- Milestone badges for habits with streaks ≥ 10 days
- Loading spinners for smooth UX
- Mobile-friendly design with collapsible menu

## Technologies Used

- **Frontend**: React, Tailwind CSS, Chart.js, react-chartjs-2, React Router, Framer Motion, Lucide React, react-hot-toast
- **Storage**: localStorage for persistent habit data
- **No Backend**: Uses localStorage and browser APIs (Notifications)

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A modern web browser (e.g., Chrome, Firefox for notifications)

### Clone the Repository

```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
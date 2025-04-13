// Calculate streak based on progressLog
export const calculateStreak = (progressLog = []) => {
    if (!progressLog.length) return 0;
  
    const today = new Date();
    const sortedLog = [...progressLog].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let expectedDate = new Date(today);
  
    for (const log of sortedLog) {
      const logDate = new Date(log.date);
      const isExpectedDate = logDate.toDateString() === expectedDate.toDateString();
  
      if (isExpectedDate && log.progress === 100) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }
  
    // Check if today’s progress is missing or not 100%
    const latestLog = sortedLog[0];
    const latestIsToday = latestLog && new Date(latestLog.date).toDateString() === today.toDateString();
    if (!latestIsToday || (latestIsToday && latestLog.progress !== 100)) {
      streak = Math.max(0, streak - 1); // Exclude today if incomplete
    }
  
    return streak;
  };
  
  // Check if a milestone is reached
  export const checkMilestone = (streak) => {
    const milestones = [7, 30, 100];
    return milestones.includes(streak) ? streak : null;
  };
  
  // Check if habit is incomplete today
  export const isIncompleteToday = (progressLog = []) => {
    const today = new Date().toDateString();
    return !progressLog.some(log => new Date(log.date).toDateString() === today && log.progress === 100);
  };
  
  // Request notification permission and schedule reminder
  export const scheduleReminder = (habitId, habitName, reminderTime) => {
    if (!("Notification" in window)) return;
  
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const now = new Date();
        const [hours, minutes] = reminderTime.split(':').map(Number);
        let reminderDate = new Date(now);
        reminderDate.setHours(hours, minutes, 0, 0);
  
        // If reminder time is past, schedule for tomorrow
        if (reminderDate < now) {
          reminderDate.setDate(reminderDate.getDate() + 1);
        }
  
        const timeUntilReminder = reminderDate - now;
  
        setTimeout(() => {
          new Notification(`Habit Reminder: ${habitName}`, {
            body: `Don't forget to complete "${habitName}" today!`,
            icon: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=32&q=80",
          });
        }, timeUntilReminder);
      }
    });
  };
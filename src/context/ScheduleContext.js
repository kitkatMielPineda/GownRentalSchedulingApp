import React, {createContext, useState} from 'react';

// Create Context
export const ScheduleContext = createContext();

export const ScheduleProvider = ({children}) => {
  // State to store schedules
  const [schedules, setSchedules] = useState([]);

  // Function to add a schedule
  const addSchedule = newSchedule => {
    setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
  };

  // Function to remove a schedule
  const removeSchedule = scheduleId => {
    setSchedules(prevSchedules =>
      prevSchedules.filter(schedule => schedule.id !== scheduleId),
    );
  };

  // Function to update a schedule
  const updateSchedule = (scheduleId, updatedSchedule) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.id === scheduleId
          ? {...schedule, ...updatedSchedule}
          : schedule,
      ),
    );
  };

  return (
    <ScheduleContext.Provider
      value={{schedules, addSchedule, removeSchedule, updateSchedule}}>
      {children}
    </ScheduleContext.Provider>
  );
};

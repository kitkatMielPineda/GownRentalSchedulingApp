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

  // ✅ Function to update an existing schedule
  const updateSchedule = updatedSchedule => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule,
      ),
    );
  };

  const cancelSchedule = rentalId => {
    setSchedules(prevSchedules =>
      prevSchedules.filter(sch => sch.id !== rentalId),
    );
  };

  return (
    <ScheduleContext.Provider
      value={{schedules, addSchedule, updateSchedule, cancelSchedule}}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default function getAppointmentsForDay(state, day) {


  if (state.days.length ) {

    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {
      const appointmentIds = filteredDays[0].appointments
      const apptArray = [];
      for (let id of appointmentIds) {
        for (let appointment in state.appointments) {
          if (state.appointments[appointment].id === id) {
            apptArray.push(state.appointments[appointment])
          }
        }
      }
    
      return apptArray;
  
  
    } else return [];

  }

  else return [];
}


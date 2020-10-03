export function getAppointmentsForDay(state, day) {


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

export function getInterview(state, interview) {
  const interviewObj = {}

  if (!interview) {
    return null
  } 
  interviewObj["student"] = interview.student;
  interviewObj["interviewer"] = state.interviewers[interview.interviewer];
  return interviewObj;

}

export function getInterviewersForDay(state, day) {


  if (state.days.length ) {

    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {

      const interviewerIds = filteredDays[0].interviewers
      const interviewersArray = [];
      
      for (let id of interviewerIds) {
        
        for (let interviewer in state.interviewers) {

          
          if (state.interviewers[interviewer].id === id) {
            interviewersArray.push(state.interviewers[interviewer])
          }

        }
      }
      console.log("returning", interviewersArray)
      return interviewersArray;
  
    } else return [];

  }

  else return [];
}
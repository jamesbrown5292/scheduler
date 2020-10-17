
//Given a day and the application sate, return all of the appointments for that day
export function getAppointmentsForDay (state, day) {
  const apptArray = [];
  if (state.days.length) {
    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {
      const appointmentIds = filteredDays[0].appointments;
      for (const appointment in state.appointments) {
        if (appointmentIds.includes(state.appointments[appointment].id)) {
          apptArray.push(state.appointments[appointment]);
        }
      }
    } 
  } 
  return apptArray;
}

//Get the details for an interview including the student and interviewer name
export function getInterview (state, interview) {
  const interviewObj = {};

  if (!interview) {
    return null;
  }
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

//Get the details for all interviewers working on a particular day including the avatar and name
export function getInterviewersForDay (state, day) {
  
  const interviewersArray = [];
  if (state.days.length) {
    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {
      const interviewerIds = filteredDays[0].interviewers;
      
      for (const interviewer in state.interviewers) {
        if (interviewerIds.includes(state.interviewers[interviewer].id)) {
          interviewersArray.push(state.interviewers[interviewer]);
        }
      }
    } 
  } 
  return interviewersArray;
}

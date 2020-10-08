export function getAppointmentsForDay (state, day) {
  if (state.days.length) {
    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {
      const appointmentIds = filteredDays[0].appointments;
      const apptArray = [];

      for (const id of appointmentIds) {
        for (const appointment in state.appointments) {
          if (state.appointments[appointment].id === id) {
            apptArray.push(state.appointments[appointment]);
          }
        }
      }

      return apptArray;
    } else return [];
  } else return [];
}

export function getInterview (state, interview) {
  const interviewObj = {};

  if (!interview) {
    return null;
  }
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

export function getInterviewersForDay (state, day) {
  if (state.days.length) {
    const filteredDays = state.days.filter(dayName => dayName.name === day);

    if (filteredDays.length) {
      const interviewerIds = filteredDays[0].interviewers;
      const interviewersArray = [];

      for (const id of interviewerIds) {
        for (const interviewer in state.interviewers) {
          if (state.interviewers[interviewer].id === id) {
            interviewersArray.push(state.interviewers[interviewer]);
          }
        }
      }
      return interviewersArray;
    } else return [];
  } else return [];
}

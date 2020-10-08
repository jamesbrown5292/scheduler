import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData (initial) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: day.spots - 1 };
      }
      return day;
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state, appointments, days: newDays
      });
    });
  };

  const cancelInterview = (id) => {
    const newDays = state.days.map((day) => {
      console.log('dayspots', day.spots);
      if (day.appointments.includes(id)) {
        const newDay = {
          ...day,
          spots: day.spots + 1
        };
        console.log('dayspots2', newDay.spots);

        return { ...day, spots: day.spots + 1 };
      }
      return day;
    });

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((response) => {
          setState({ ...state, days: newDays });
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    );
  };

  function edit (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state, appointments
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview, edit };
}

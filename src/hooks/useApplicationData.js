import { useState, useEffect }  from "react";
import axios from "axios";


export default function useApplicationData(initial) {

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

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    
  }, []);


  const bookInterview = (id, interview) => {
    console.log("save sequence, decrease spots count, state is", state)
    console.log("id is", id)

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const stateCopy = {...state}
    for (let day of stateCopy.days) {
      if (day.appointments.includes(id)) {
        day.spots --;
      }
    }

    return axios.put(`/api/appointments/${id}`, {interview}).then( () => {
      setState({
        ...stateCopy, appointments
      });
    })
  };

  

  const cancelInterview = (id) => {

    const stateCopy = {...state}
    for (let day of stateCopy.days) {
      if (day.appointments.includes(id)) {
        day.spots ++;
      }
    }

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((response) => {
          setState({...stateCopy})
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    )
  };


  function edit(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, {interview}).then( () => {
      setState({
        ...state, appointments
      });
    })

  };
  
  return {state, setDay, bookInterview, cancelInterview, edit};

}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment"
import {getAppointmentsForDay,  getInterview, getInterviewersForDay } from "../helpers/selectors.js"




export default function Application(props) {

  
  const [state, setState] = useState({
    days: [],
    appointments: {},
    day: "Monday",
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
  });

  let dailyAppointments = []
  let interviewers = []

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  dailyAppointments = getAppointmentsForDay(state, state.day);
  interviewers = getInterviewersForDay(state, state.day)

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log("appt", appointment);

    return axios.put(`/api/appointments/${id}`, {interview}).then( () => {
      setState({
        ...state, appointments
      });
      console.log("put req ", interview)
    })

  }
  console.log("state", state)



  function cancelInterview(id) {

    // return axios.delete(`/api/appointments/${id}`).then( () => {
    //   setState({
    //     ...state,
    //   })
    // })
    return (
      axios.delete(`/api/appointments/${id}`)
        .then((response) => {
          setState({...state})
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    )
}
  
  
  function edit(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log("ainterviewppt", interview);

    return axios.put(`/api/appointments/${id}`, {interview}).then( () => {
      setState({
        ...state, appointments
      });
      console.log("put req ", interview)
    })

  }
    

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">

          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList

            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {

          const interview = getInterview(state, appointment.interview);

          return (
            <Appointment 
              edit={edit}
              key={appointment.id} 
              {...appointment} 
              interview={interview} 
              interviewers={interviewers} 
              bookInterview={bookInterview} 
              cancelInterview={cancelInterview}
              />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

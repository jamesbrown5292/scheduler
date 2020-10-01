import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment"
import getAppointmentsForDay from "../helpers/selectors.js"





export default function Application(props) {
  
  const [state, setState] = useState({
    days: [],
    appointments: {},
    day: "Monday"
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
  });

  let dailyAppointments = []

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  dailyAppointments = getAppointmentsForDay(state, state.day);

  
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log("loggin all", all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, day: all[2].data}));
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
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

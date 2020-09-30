import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  
  const interviewBooked = props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty onAdd={props.onAdd}/>

  return (
    <div>
      <Header time={props.time}/>
      <article className="appointment"></article>
      {interviewBooked}
    </div>
  )



}
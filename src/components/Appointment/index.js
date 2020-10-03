import React, { useEffect } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Form from "components/Appointment/Form"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Empty from "components/Appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }; 
    props.bookInterview(props.id, interview).then(() => {transition("SHOW")});
    transition(SAVING);
    
  }

  const deleteInterview = () => {
    props.cancelInterview(props.id).then(() => {
      transition(CONFIRM);
    })
  }

  function onEdit(name, interviewer) {
    transition(EDIT);
    const interview = {
      student: name,
      interviewer
    }; 
    props.edit(props.id, interview).then(() => {transition("SHOW")});
  }

  

  console.log("propsinterview", props.interview)

  // const interviewBooked = props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty onAdd={props.onAdd}/>
  return (
    <div>
      <Header time={props.time}/>
      <article className="appointment"></article>
      {mode === SAVING && <Status/> }
      {mode === CONFIRM && <Confirm onConfirm={() => {transition(EMPTY)}} onCancel={() => {back()}}/> }
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (

        <Show
          // inteviewerId = {props.interview.interviewer.id} 
          cancelInterview={deleteInterview}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
        />
    )}
    {mode === CREATE && <Form 

      interviewers={Object.values(props.interviewers)}
      save = {save}
      onCancel={() => transition("EMPTY")}
      
    />}

    {mode === EDIT && <Form 
      name={props.interview.student}
      inteviewerId = {props.interview.interviewer.id} 
      interviewers = {Object.values(props.interviewers)}
      save = {save}
      onCancel={() => back()}

    />}
    </div>
  )



}
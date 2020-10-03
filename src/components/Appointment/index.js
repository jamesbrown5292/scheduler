import React, { useEffect } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Form from "components/Appointment/Form"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Empty from "components/Appointment/Empty"
import Error from "components/Appointment/Error"
import useVisualMode from "../../hooks/useVisualMode"
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }; 
    props.bookInterview(props.id, interview).then(() => {transition("SHOW")}).catch((e) => {
      transition(ERROR_SAVE)
    });
    transition(SAVING);
    
  }

  const deleteInterview = () => {
    // transition(CONFIRM);
    
    console.log("delete interview running");
    props.cancelInterview(props.id).then(() => {
    }).catch((e) => {
      console.log("del int eerror rec'd", e)
      transition(ERROR_DELETE);
    });
  }

  const confirmClick = () => {
    transition(CONFIRM)
  }

  function onEdit(name, interviewer) {
    transition(EDIT);
    // const interview = {
    //   student: name,
    //   interviewer
    // }; 
    // props.edit(props.id, interview).then(() => {transition("SHOW")});
  }

  

  console.log("propsinterview", props.interview)

  // const interviewBooked = props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty onAdd={props.onAdd}/>
  return (
    <div>
      <Header time={props.time}/>
      <article className="appointment"></article>
      {mode === SAVING && <Status/> }
      {mode === CONFIRM && <Confirm onConfirm={() => deleteInterview()} onCancel={() => {back()}}/> }
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && <Error onClose={() => transition(CREATE)}/>}
      {mode === ERROR_DELETE && <Error onClose={() => transition(SHOW)}/>}
      {mode === SHOW && (

        <Show
          // inteviewerId = {props.interview.interviewer.id} 
          onConfirm={confirmClick}
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
      studentName={props.interview.student}
      interviewerId = {props.interview.interviewer.id} 
      interviewers = {Object.values(props.interviewers)}
      save = {save}
      onCancel={() => back()}

    />}
    </div>
  )



}
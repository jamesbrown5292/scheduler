// import React, { useEffect } from 'react'
import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Form from 'components/Appointment/Form';
import Show from 'components/Appointment/Show';
import Confirm from 'components/Appointment/Confirm';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';

export default function Appointment (props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const DELETING = 'DELETING';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save an interview and transition to the SAVING view, book rhe inrerview and transition to the appt view...
  //...or error view if errors in saving. 
  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    }).catch((e) => {
      transition(ERROR_SAVE, true);
    });
  }

  //Delet an interview and transition to the empty appointment field. Show the DELETING view after the request is sent. 
  const deleteInterview = () => {

    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    }).catch((e) => {
      transition(ERROR_DELETE, true);
    });
    transition(DELETING);
  };

  //Confirm deletion with user
  const confirmClick = () => {
    transition(CONFIRM);
  };

  //Handle user clicking edit button
  function onEdit (name, interviewer) {
    transition(EDIT);
  }

  return (
    <div data-testid="appointment">
      <Header time={props.time}/>
      <article className="appointment" ></article>
      {mode === SAVING && <Status message="Saving"/> }
      {mode === DELETING && <Status message="DELETING"/> }
      {mode === CONFIRM && <Confirm onConfirm={() => deleteInterview()} onCancel={() => { back(); }}/> }
      {mode === EMPTY && <Empty alt="Add" onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && <Error onClose={back}/>}
      {mode === ERROR_DELETE && <Error onClose={back}/>}
      {mode === SHOW && (

        <Show
          onConfirm={confirmClick}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete
        />
      )}
      {mode === CREATE && <Form

        interviewers={Object.values(props.interviewers)}
        save = {save}
        onCancel={() => transition('EMPTY')}

      />}

      {mode === EDIT && <Form
        name={props.interview.student}
        interviewerId = {props.interview.interviewer && props.interview.interviewer.id}
        interviewers = {Object.values(props.interviewers)}
        save = {save}
        onCancel={() => back()}

      />}
    </div>
  );
}

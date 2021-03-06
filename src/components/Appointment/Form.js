import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

//Form view for when user creates an appt.
const Form = (props) => {
  const { name, interviewerId, interviewers, save, onCancel } = props;
  const [studentName, setName] = useState(name || '');
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const [error, setError] = useState('');

  //Reset the form fields
  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  //Cancel interview creation
  const cancel = () => {
    reset();
    onCancel();
  };

  //Valiate form input
  function validate () {
    if (studentName === '') {
      setError('Student name cannot be blank');
      return;
    }
    setError('');
    save(studentName, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}
        >
          <input

            value={studentName}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => { setName(event.target.value); }}
            data-testid="student-name-input"
          />

          <section className="appointment__validation">{error}</section>

        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {
            validate();
          }}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;

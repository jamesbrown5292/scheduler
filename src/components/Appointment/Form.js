import React, {useState} from 'react';
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

const Form = ({studentName, interviewerId, interviewers, save, onCancel}) => {

  const [name, setName] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  console.log("intervieweer Id form", interviewerId);
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  
  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}
>
        <input

          value={name}
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => {setName(event.target.value)}}
          /*
          This must be a controlled component
          */
         />
      </form>
      <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => {save(name, interviewer)}}>Save</Button>
      </section>
    </section>
    </main>
  );
};

export default Form;
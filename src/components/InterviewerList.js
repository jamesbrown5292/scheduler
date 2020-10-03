import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";

function InterviewerList(props) {


  const interviewers = props.interviewers.map((person) => {
    return (

        <InterviewerListItem 

          key={person.id}
          avatar= {person.avatar}
          name={person.name}
          setInterviewer={() => props.onChange(person.id)}
          selected = {props.value === person.id}
        />

    );
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light"> Interviewers </h4>
    <ul className="interviewers__list">
    {interviewers}

    </ul>
  </section>);

  
}

export default InterviewerList;
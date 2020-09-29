import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";

function InterviewerList(props) {


  const interviewers = props.interviewers.map((person) => {
    return (
      <li>
        <InterviewerListItem 
          avatar= {person.avatar}
          name={person.name}
          setInterviewer={props.setInterviewer}
          selected = {props.interviewer === person.id}

        />
      </li>
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
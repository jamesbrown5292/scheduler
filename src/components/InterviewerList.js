import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";
import PropTypes from 'prop-types'; // ES6


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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
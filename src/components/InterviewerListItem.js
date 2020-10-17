import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';


//Individual interviewer, their name and avatar
export default function (props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': (props.selected === true)

  });

  return (<li className={interviewerClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      onClick = {props.setInterviewer}
    />
    {props.selected ? props.name : '' }
  </li>);
}

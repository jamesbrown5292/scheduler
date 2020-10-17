import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

//Item with day name and spots remaining for day
export default function DayListItem (props) {
  const listItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });
  const spots = props.spots;
  let spotsWords = '';
  if (spots === 0) {
    spotsWords = 'no spots remaining';
  } else if (spots === 1) {
    spotsWords = spots + ' spot remaining';
  } else {
    spotsWords = spots + ' spots remaining';
  }

  return (
    <li className={listItemClass} onClick={() => props.setDay(props.name) } data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {spotsWords} </h3>
    </li>
  );
}

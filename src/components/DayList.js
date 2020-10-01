import React from "react"
import DayListItem from "./DayListItem"

export default function DayList(props) {
  
  console.log("props log", props);
  const days = props.days.map(day => {
    return (
      <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}      
      />
    )
  })

  return days;

}
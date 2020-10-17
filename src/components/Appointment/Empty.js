import React from 'react';


//Empty view for when no appt. exists in a given time slot
const Empty = (props) => {
  return (
    <main className="appointment__add" alt="Add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;

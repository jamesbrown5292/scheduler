import React from 'react';

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

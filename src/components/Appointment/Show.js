import React from 'react';

//Show view for when an appt exists in a given time slot showing student and interviewer name and delete, edit buttons
const Show = (props) => {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer && props.interviewer.name }</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            data-testid="delete"
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onConfirm}
          />
        </section>
      </section>
    </main>
  );
};

export default Show;

import React from 'react';
import { render, cleanup, act, waitForElement, fireEvent, getByText, queryByAltText, queryByText, getAllByTestId, getByPlaceholderText, getByAltText, getByTestId } from '@testing-library/react';

import Application from 'components/Application';

describe('Application', () => {
  afterEach(() => { cleanup(); });

  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    act(() => {
      fireEvent.click(getByText('Tuesday'));
    })

    expect(getByText('Leopold Silvers')).toBeInTheDocument();

  });

  xit('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    act(() => {
      fireEvent.click(getByAltText(appointment, 'Add'));
    })

    act(() => {
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: 'Lydia Miller-Jones' }
      });
    })

    act(() => {
      fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    })

    act(() => {
      fireEvent.click(getByText(appointment, 'Save'));
    })
    

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')

    );
    expect(getByText(day, /No Spots remaining/i)).toBeInTheDocument();
  });

  xit('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, 'Delete'));
    })

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, 'Delete the appointment?')
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    act(() => {
      fireEvent.click(queryByText(appointment, 'Confirm'));
    })

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );

    act(() => {
      fireEvent.click(queryByAltText(appointment, 'Edit'));
    })
    await waitForElement(() => getByPlaceholderText(container, 'Enter Student Name'));

    expect(getByPlaceholderText(container, 'Enter Student Name')).toBeInTheDocument();

    act(() => {
      fireEvent.change(getByTestId(container, 'student-name-input'), {
        target: { value: 'James' }
      });
    })

    act(() => {
      fireEvent.click(queryByText(appointment, 'Save'));
    })

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Saving'));

    await waitForElement(() => getByText(container, 'James'));
    expect(getByText(container, 'James')).toBeInTheDocument();
  });
});

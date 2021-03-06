import {  useEffect, useReducer } from 'react';
import axios from 'axios';

//Custom hook for handling API routes for setting, updating, and deleting appointments and updating state to reflect these changes. 
export default function useApplicationData (initial) {
  
  const SET_DAY = "SET_DAY";
  const SET_DAYS = "SET_DAYS";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //reducer to handle updates to state from different actions
  const reducer = (state, action) => {
    
    switch(action.type) {
      case SET_DAY:
        const { day } = action;
        return {...state, day};

      case SET_DAYS: 
        return { ...state, days: action.days };

      case SET_APPLICATION_DATA:
        const { days, interviewers } = action;
        return {
          ...state,
          days,
          appointments: action.appointments,
          interviewers
        };

      case SET_INTERVIEW:
        const { id, interview } = action;

        const appointment = {
          ...state.appointments[id],
          interview
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        return {
          ...state,
          appointments
        };

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    };
  };

  //use reducer to handle application state for CRUD routes
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch(({ 
        type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, []);


  const bookInterview = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        return axios.get("/api/days");
      })
      .then((response) => {
        dispatch({type: SET_INTERVIEW, id, interview});
        dispatch({ type: SET_DAYS, days: response.data });
      });
  };

  const cancelInterview = (id) => {

    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          return axios.get("/api/days");
        })
        .then((response) => {
          dispatch({type: SET_INTERVIEW, id, interview: null });
          dispatch({ type: SET_DAYS, days: response.data });
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    );
  };

  const edit = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id, 
        interview
      });
    });
  };

  return { state, setDay, bookInterview, edit, cancelInterview };
}

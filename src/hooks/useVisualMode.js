import React, { useState } from 'react';


//Handle switching through modes while performing CRUD actions. Uses stack to handle user pressing 'back'
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      const newHistory = [...history];
      newHistory.pop();

      newHistory.push(newMode);
      setHistory(newHistory);
    } else {
      setHistory(prevMode => ([...prevMode, newMode]));
    }
  };

  const back = () => {
    const newHistory = [...history];
    if (newHistory.length > 1) { newHistory.pop(); }
    setHistory(newHistory);
    const newMode = newHistory[newHistory.length - 1];
    setMode(newMode);
  };

  return { mode, transition, back };
}

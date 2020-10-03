import React, { useState }  from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);




  const transition = (newMode, replace = false) => {
    if (replace === true) {
      
      
      const newHistory = [...history]
      newHistory.pop()

      newHistory.push(newMode)
      setHistory(newHistory);
    } else {
      setHistory(prevMode => ([...prevMode, newMode]))

    }
    setMode(newMode);


  }
  
  const back = () => {
    if (history.length < 2) {
      return;
  }
  setMode(history[history.length-2])
      

      const newHistory = [...history];
      newHistory.pop();
      
      setHistory(newHistory);
    }

  return {mode, transition, back };
}



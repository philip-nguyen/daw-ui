import React, { useState } from 'react';
import "../style.css";

const SixteenthNote = () => {
  const [on, setOn] = useState(false);
  // const isOn = false;
  
  //<button onClick={() => setOn(!on)} class={`ui ${on ? 'blue' : ''} button`}></button>
  
  return (
    <div className="pad"></div>
    );
};

export default SixteenthNote;
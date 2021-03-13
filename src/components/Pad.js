import React, { useState } from 'react';
import "../style.css";

// The single note button
const Pad = () => {
  const [on, setOn] = useState(false);
  // const isOn = false;
  
  //<button onClick={() => setOn(!on)} class={`ui ${on ? 'blue' : ''} button`}></button>
  const toggle = () => {
    setOn(!on);
  }
  
  return (
    <div className={on ? 'pad pad-pressed' : 'pad'} onClick={() => toggle()}></div>
    );
};

export default Pad;
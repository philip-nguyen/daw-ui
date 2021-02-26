import React, { useState } from 'react';

const SixteenthNote = () => {
  const [on, setOn] = useState(false);
  // const isOn = false;
  
  return (
    <button onClick={() => setOn(!on)} 
      class={`ui ${on ? 'blue' : ''} button`}></button>
  );
};

export default SixteenthNote;
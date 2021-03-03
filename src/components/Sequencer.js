import React from 'react';
import Pad from './Pad';
import '../style.css';

const Sequencer = () => {
  const one16thSequence = [];
  const octave = [];

  for(let i = 0; i < 13; i++) {
    octave.push(
      <Pad />
    );
  }

  for(let i = 0; i < 16; i++) {
    one16thSequence.push(
      <div className="">
        <div id={`step-${i+1}`} className="pads-column">
          {octave}
        </div>
      </div>
    );
  }

  // <!-- here comes the description of what the line is or sounds like -->
  return (
    <div className="flex">
      {one16thSequence}
    </div>
  );
};

export default Sequencer;
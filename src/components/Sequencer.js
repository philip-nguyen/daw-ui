import React from 'react';
import SixteenthNote from './SixteenthNote';

const Sequencer = () => {
  const one16thSequence = [];
  const octave = [];

  for(let i = 0; i < 13; i++) {
    octave.push(
      <SixteenthNote />
    );
  }

  for(let i = 0; i < 16; i++) {
    one16thSequence.push(
      <div className="one wide column">
        <div className="ui vertical buttons">
          {octave}
        </div>
      </div>
    );
  }

  return (
    <div className="ui grid">
      {one16thSequence}
    </div>
  );
};

export default Sequencer;
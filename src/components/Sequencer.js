import React, { Component } from 'react';
import Pad from './Pad';
import '../style.css';



class Sequencer extends Component {
  

  togglePadPressedClass = (pad) => {
    pad.classList.contains("pad-pressed")
    ? pad.classList.remove("pad-pressed")
    : pad.classList.add("pad-pressed");
  } 
  
  constructor(props) {
    super(props);
    this.state = {
      one16thSequence: [],
      
    }
    //const one16thSequence = [];
    const octave = [];
    for(let i = 0; i < 13; i++) {
      octave.push(
        <Pad onClick={this.togglePadPressedClass}/>
      );
    }
  
    for(let i = 0; i < 16; i++) {
      this.state.one16thSequence.push(
        <div className="">
          <div id={`step-${i+1}`} className="pads-column">
            {octave}
          </div>
        </div>
      );
    }
  }
  

  // <!-- here comes the description of what the line is or sounds like -->
  render() {
    return (
      <div className="flex">
        {this.state.one16thSequence}
      </div>
    );
  }
  
};

export default Sequencer;
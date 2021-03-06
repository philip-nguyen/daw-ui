import React, { Component } from 'react';
import * as Tone from 'tone';
import Pad from './Pad';
import '../style.css';
import { Synth } from 'tone';



class Sequencer extends Component {
  togglePadPressedClass = (clickedColumn, clickedNote) => {
    // Shallow copy of our grid with updated isActive
    let updatedGrid = this.state.measure.map((column, columnIndex) =>
      { console.log(column);
        column.map((cell, cellIndex) => {
        let cellCopy = cell;

        // Flip isActive for the clicked note-cell in our grid
        if (columnIndex === clickedColumn && cellIndex === clickedNote) {
          cellCopy.isActive = !cell.isActive;
        }

        return cellCopy;
      })}
    );
    this.setState({
      measure : updatedGrid
    })
    /*
      pad.classList.contains("pad-pressed")
    ? pad.classList.remove("pad-pressed")
    : pad.classList.add("pad-pressed");
    */
  } 
  
  playSequence = () => {
    const osc = new Tone.Oscillator().toDestination();
    
    Tone.Transport.scheduleRepeat((time) => {
    	osc.start(time).stop(time +  0.1);
    }, "16n");

    Tone.Transport.start();
  }

  playChord(step, time, tone) {
    let chord = [];
    for(let i = 0; i < this.state.sequence.length; i++) {
      if (step[i]);
    }
  }

  mapMeasure() {
    const measure = [];
    for(let i = 0; i < 16; i++) {
      let notes = [
        {note : "C4", isActive: false, velocity: 0.9},
        {note : "C#4",isActive: false,  velocity: 0.9},
        {note : "D4", isActive: false, velocity: 0.9},
        {note : "D#4", isActive: false, velocity: 0.9},
        {note : "E4", isActive: false, velocity: 0.9},
        {note : "F4", isActive: false, velocity: 0.9},
        {note : "F#4", isActive: false, velocity: 0.9},
        {note : "G4", isActive: false, velocity: 0.9},
        {note : "G#4", isActive: false, velocity: 0.9},
        {note : "A4", isActive: false, velocity: 0.9},
        {note : "A#4", isActive: false, velocity: 0.9},
        {note : "B4", isActive: false, velocity: 0.9},
        {note : "B#4", isActive: false, velocity: 0.9}
      ];
      measure.push(notes);
    }
    console.log('measure', measure);
    return measure;
  }

  constructor(props) {
    super(props);
    const notes = [
      {note : "C4", isActive: false, velocity: 0.9},
      {note : "C#4",isActive: false,  velocity: 0.9},
      {note : "D4", isActive: false, velocity: 0.9},
      {note : "D#4", isActive: false, velocity: 0.9},
      {note : "E4", isActive: false, velocity: 0.9},
      {note : "F4", isActive: false, velocity: 0.9},
      {note : "F#4", isActive: false, velocity: 0.9},
      {note : "G4", isActive: false, velocity: 0.9},
      {note : "G#4", isActive: false, velocity: 0.9},
      {note : "A4", isActive: false, velocity: 0.9},
      {note : "A#4", isActive: false, velocity: 0.9},
      {note : "B4", isActive: false, velocity: 0.9},
      {note : "B#4", isActive: false, velocity: 0.9}
    ];
    this.state = {
      sequence: [],
      isPlaying: false,
      transportBpm: 138,
      currentMeasure: null,
      playheadPosition: null,
      playheadScheduleId: null,
      
      measure: this.mapMeasure()
    }

    this.togglePadPressedClass = this.togglePadPressedClass.bind(this);
    // this.state.measureArray[0].pitch

    console.log(this.state.measure);
  }
  
  playSequence = async () => {
    // Variable for storing our ntoe in an appropriate format for the synth
    let notes = [];
    this.state.measure.map((step) => {
      let stepNotes = [];
      step.map(
        (shouldPlay) =>
        //If isActive, push the given note (with our chosen octave)
        shouldPlay.isActive &&
        stepNotes.push(shouldPlay.note)
      );
      notes.push(stepNotes);
    });

    // start the Tone context
    await Tone.start();
    // Tone.Sequence()
    //@param callback
    //@param "events" to send with callback
    //@param subdivision  to engage callback
    const Sequencer = new Tone.Sequence(
      (time, column) => {
        Synth.triggerAttackRelease(notes[column], "16n", time);
      }
    )

  }

  // <!-- here comes the description of what the line is or sounds like -->
  render() {
    return (
      <div className="flex">
        {this.state.measure.map((step, stepIndex) => (
          <div key={stepIndex + "step"} 
               id={`step-${stepIndex+1}`} className="pads-column"
          >
            {step.map(({note, isActive}, noteIndex) => (
              <Pad note={note} isActive={isActive}
                onClick={() => this.togglePadPressedClass(stepIndex, noteIndex)}
                key={note + stepIndex}
              />
            ))}
          </div>
    ))}
        {this.state.measure}
        
      </div>
    );
  }
  
};
//{this.state.sequence}

export default Sequencer;
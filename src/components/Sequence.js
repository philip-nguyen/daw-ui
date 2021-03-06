import React, { useState } from 'react';
import '../style.css';
import Pad from './Pad';
import * as Tone from 'tone';

function mapMeasure() {
    const measure = [];
    for(let i = 0; i < 16; i++) {
      let notes = [
        {note : "C", isActive: false, velocity: 0.9},
        {note : "C#",isActive: false,  velocity: 0.9},
        {note : "D", isActive: false, velocity: 0.9},
        {note : "D#", isActive: false, velocity: 0.9},
        {note : "E", isActive: false, velocity: 0.9},
        {note : "F", isActive: false, velocity: 0.9},
        {note : "F#", isActive: false, velocity: 0.9},
        {note : "G", isActive: false, velocity: 0.9},
        {note : "G#", isActive: false, velocity: 0.9},
        {note : "A", isActive: false, velocity: 0.9},
        {note : "A#", isActive: false, velocity: 0.9},
        {note : "B", isActive: false, velocity: 0.9},
        {note : "B#", isActive: false, velocity: 0.9}
      ];
      measure.push(notes);
    }
    
    return measure;
}

const CHOSEN_OCTAVE = "4";

const Sequence = () => {
    // A nested array of objects is not performant, but is easier to understand
    // performance is not an issue at this stage anyway
    const[grid, setGrid] = useState(mapMeasure());

    // Boolean to handle if music is played or not
    const [isPlaying, setIsPlaying] = useState(false);

    // Used to visualize which column is making sound
    const [currentColumn, setCurrentColumn] = useState(null);

    //Notice the new PolySynth in use here, to support multiple notes at once
    const synth = new Tone.PolySynth().toDestination();

    function togglePadPressedClass(clickedColumn, clickedNote){
        // Shallow copy of our grid with updated isActive
        let updatedGrid = grid.map((column, columnIndex) =>
           
            column.map((cell, cellIndex) => {
            let cellCopy = cell;
    
            // Flip isActive for the clicked note-cell in our grid
            if (columnIndex === clickedColumn && cellIndex === clickedNote) {
              cellCopy.isActive = !cell.isActive;
              console.log(cell);
            }
    
            return cellCopy;
          })
        );
        
        setGrid(updatedGrid);
        /*
          pad.classList.contains("pad-pressed")
        ? pad.classList.remove("pad-pressed")
        : pad.classList.add("pad-pressed");
        */
    }
    
    const clearSelectedPads = () => {
        document.querySelectorAll(".pad-pressed").forEach(pad => {
          pad.classList.remove("pad-pressed");
        });
    }

    const PlaySequence = async () => {
        // Variable for storing our notes in an appropriate format for our synth
        let notes = [];
        grid.map((step) => {
            let stepNotes = [];
            step.map(
                (shouldPlay) =>
                    // If isActive, push the given note + octave
                    shouldPlay.isActive &&
                    stepNotes.push(shouldPlay.note + CHOSEN_OCTAVE)
            );
            notes.push(stepNotes);
        });

        // Starts our Tone Context
        await Tone.start();

        // Tone.Sequence()
        // @param callback
        // @param "events" to send with callback
        // @param subdivision  to engage callback
        const Sequencer = new Tone.Sequence(
            (time, step) => {
                // Highlight column with styling
                setCurrentColumn(step);

                // Sends the active note to our Polysynth
                synth.triggerAttackRelease(notes[step], "16n", time);
            },
            // can use [...Array(grid.length).keys()] 
            // to get the length of the grid dynamically
            [...Array(grid.length).keys()],
            "16n"
        );
        if (isPlaying) {
            // Turn of our player if music is currently playing
            setIsPlaying(false);
            setCurrentColumn(null);
      
            await Tone.Transport.stop();
            await Sequencer.stop();
            await Sequencer.clear();
            await Sequencer.dispose();
      
            return;
          }
          setIsPlaying(true);
          // Toggles playback of our musical masterpiece
          await Sequencer.start();
          await Tone.Transport.start();
    }

    //console.log(grid);
    return (
        <div id="sequencer">
            <div className="sequencer">
                <div id="controls" className="buttons">
                    <button id="stop" className="navigation-buttons fa fa-stop" disabled></button>
                    <button id="play" className="navigation-buttons fa fa-play"
                        onClick={() => PlaySequence()}
                        ><i className="play icon"></i></button>
                    <button id="record" className="navigation-buttons fa fa-microphone"></button>
                    <button id="delete" className="navigation-buttons fa fa-trash" 
                        onClick={() => clearSelectedPads()}>
                            <i className="trash alternate icon"></i>
                        </button>

            
                    <div className="select-wrapper">
                        <span>Instrument</span>
                        <select className="wave navigation-buttons" id="instrument-control" data-label="wave">
                            <option className="optionColor" value="sine">Synth</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <span>Octave</span>
                        <select id="octave-control" data-label="octave" className="octave navigation-buttons">
                            <option> 1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <span>Style</span>
                        <select id="style-control" data-label="octave" className="BPM navigation-buttons">
                            <option>Legato</option>
                            <option>Staccato</option>
                        </select>
                    </div>

                    <div className="select-wrapper slide-container">

                        <br/>
                        <div className="input-container">
                            <span id="bpm-display"></span>
                            <input type="range" min="60" max="200" value="120" className="slider" id="bpm-slider"/>
                        </div>
                    </div>

                    
                    <ul className="notes">
                        
                        <li>B#4</li>
                        <li>B4</li>
                        <li>A#4</li>
                        <li>A4</li>
                        <li>G#4</li>
                        <li>G4</li>
                        <li>F#4</li>
                        <li>F4</li>
                        <li>E4</li>
                        <li>D#4</li>
                        <li>D4</li>
                        <li>C#4</li>
                        <li>C4</li>
                    </ul>
                    
                    
                </div>
                <div className="flex">
                    {grid.map((step, stepIndex) => (
                    <div key={stepIndex + "step"} 
                        id={`step-${stepIndex+1}`} className="pads-column"
                        >
                        {step.map(({note, isActive}, noteIndex) => (
                        <Pad note={note} isActive={isActive}
                            onClick={() => togglePadPressedClass(stepIndex, noteIndex)}
                            key={note + stepIndex}
                        />
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Sequence;
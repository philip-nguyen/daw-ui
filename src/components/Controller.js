import React from 'react';
import Sequencer from './Sequencer';
import Sequence from './Sequence';
import '../style.css';
import { Tone } from 'tone/build/esm/core/Tone';

const Controller = () => {
    
    
    const clearSelectedPads = () => {
        document.querySelectorAll(".pad-pressed").forEach(pad => {
          pad.classList.remove("pad-pressed");
        });
    }

    const toggleStepPlayClass = (step) => {
        if (step === 0) {
          this.addStepPlayClass(step);
        } else if (step === 8) {
          this.removeStepPlayClass(step);
        } else {
          this.removeStepPlayClass(step);
          this.addStepPlayClass(step);
        }
    }

    const addStepPlayClass = (step) => {
        document.querySelector(`#step-${step + 1}`).classList.add("step-play");
    }
    
    const removeStepPlayClass = (step) => {
        document.querySelector(`#step-${step}`).classList.remove("step-play");
    }

    return (
        <div id="sequencer">
            <div className="sequencer">
                <div id="controls" className="buttons">
                    <button id="stop" className="navigation-buttons fa fa-stop" disabled></button>
                    <button id="play" className="navigation-buttons fa fa-play"></button>
                    <button id="record" className="navigation-buttons fa fa-microphone"></button>
                    <button id="delete" className="navigation-buttons fa fa-trash" onClick={() => clearSelectedPads()}></button>

            
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
                <Sequence />
            </div>
        </div>
        
        
    );
};

export default Controller;
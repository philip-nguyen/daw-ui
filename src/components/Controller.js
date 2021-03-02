import React from 'react';
import Sequencer from './Sequencer';
import '../style.css';

const Controller = () => {
    /*togglePadPressedClass = (pad) => {
        pad.classList.contains("pad-pressed")
          ? pad.classList.remove("pad-pressed")
          : pad.classList.add("pad-pressed");
      }
    */
    return (
        <div id="controls" class="buttons">
            <button id="stop" class="navigation-buttons fa fa-stop" disabled></button>
            <button id="play" class="navigation-buttons fa fa-play"></button>
            <button id="record" class="navigation-buttons fa fa-microphone"></button>
            <button id="delete" class="navigation-buttons fa fa-trash"></button>

      
            <div class="select-wrapper">
                <span>Instrument</span>
                <select class="wave navigation-buttons" id="instrument-control" data-label="wave">
                    <option class="optionColor" value="sine">Synth</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>

            <div class="select-wrapper">
                <span>Octave</span>
                <select id="octave-control" data-label="octave" class="octave navigation-buttons">
                    <option> 1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>

            <div class="select-wrapper">
                <span>Style</span>
                <select id="style-control" data-label="octave" class="BPM navigation-buttons">
                    <option>Legato</option>
                    <option>Staccato</option>
                </select>
            </div>

            <div class="select-wrapper slide-container">

                
                <div class="input-container">
                    <span id="bpm-display"></span>
                    <input type="range" min="60" max="200" value="120" class="slider" id="bpm-slider"/>
                </div>
            </div>

            
            <ul class="notes">
                <li>G4</li>
                <li>F#4</li>
                <li>F4</li>
                <li>E4</li>
                <li>D#4</li>
                <li>D4</li>
                <li>C#4</li>
                <li>C4</li>
            </ul>
            <Sequencer />
        </div>
        
    );
};

export default Controller;
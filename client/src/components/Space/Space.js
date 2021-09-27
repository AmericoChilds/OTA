import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Oscillator from '../Modules/Oscillator/Oscillator';
import APITool from '../Modules/APITool/APITool';
import './styles.scss';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Taskbar from '../Trinkets/Taskbar/Taskbar';
import Board from '../Trinkets/Board/Board';

import { notesToPlay, noteAndOctave } from '../Modules/Oscillator/util';
import { processWD, getScale } from '../../actions/utility';
import { curSpace } from '../../actions/spaces';

import NoLogin from './NoLogin';
import NoSpaces from './NoSpaces';

import * as Tone from 'tone';

const Space = () => {

    /*  =======
        API
        =======
    */

    // Credit: freecodecamp.org
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [apiData, setAPIData] = useState([]);
    // State for all the data pertaining to the synths
    const [osciData, setOsciData] = useState([]);
    const [toolData, setToolData] = useState([]);

    const [currentSpace, setCurrentSpace] = useState(JSON.parse(localStorage.getItem('cur_space')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userSpaces, setUserSpaces] = useState(JSON.parse(localStorage.getItem('spaces')));

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("heyh");
        const fetchData = async () => {
            if( user != null) {

                lat = 43.0592056;
                long = -89.4008958;

                navigator.geolocation.getCurrentPosition(function(position) {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                });
                console.log(lat);

                    
                console.log(long);
                await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        // Set current space to most recent one created if there's none
                        if( currentSpace == null ) {
                            dispatch(curSpace({id: null}));
                        }
                        // Set API data into local storage
                        setAPIData(result);
                        // Store api data and interpolate it
                        storeWAPIData(result);
                });

                // Set BPM from current space
                if( currentSpace != null ) {
                    if( currentSpace.data.devices?.bpm != null ) {
                        console.log("whaaat");
                        Tone.Transport.bpm.value = currentSpace.data.devices.bpm;
                    }
                }
            }
        }
        fetchData();
      }, [lat,long])
    
    const storeWAPIData = (result) => {

        let storeAPI = {}
        let apiCur = JSON.parse(localStorage.getItem('apiData'));

        storeAPI = {
            type: "weather",
            feelsLike: result?.main?.feels_like,
            humidity: result?.main?.humidity,
            temperature:  result?.main?.temp,
            pressure: result?.main?.pressure,
            windDeg: result?.wind?.deg,
            windSpeed: result?.wind?.speed
        }

        localStorage.setItem('api_data', JSON.stringify(storeAPI));

    }

    //========   Playback   ========


    
    const handlePlayBack = (time) => {
            
            if( currentSpace?.data?.devices?.notes != null ) {

                let notesPlayable = currentSpace.data.devices.notes;

                if ( notesPlayable[0] != null ) {
                    b1 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[0], "8n", time);
                    }, "1n").start("0:0:0");
                }

                if ( notesPlayable[1] != null ) {
                    b2 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[1], "8n", time);
                    }, "1n").start("0:0:2");
                }

                if ( notesPlayable[2] != null ) {
                    b3 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[2], "8n", time);
                    }, "1n").start("0:1:0");
                }

                if ( notesPlayable[3] != null ) {
                    b4 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[3], "8n", time);
                    }, "1n").start("0:1:2");
                }

                if ( notesPlayable[4] != null ) {
                    b5 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[4], "8n", time);
                    }, "1n").start("0:2:0");
                }

                if ( notesPlayable[5] != null ) {
                    b6 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[5], "8n", time);
                    }, "1n").start("0:2:2");
                }

                if ( notesPlayable[6] != null ) {
                    b7 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[6], "8n", time);
                    }, "1n").start("0:3:0");
                }

                if ( notesPlayable[7] != null ) {
                    b8 = new Tone.Loop(time => {
                        synth.triggerAttackRelease(notesPlayable[7], "8n", time);
                    }, "1n").start("0:3:2");
                }
            }
            
        }
    
    /*
    ===================
    ===   Tone JS   ===
    ===================
    */

    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var b1;
    var b2;
    var b3;
    var b4;
    var b5;
    var b6;
    var b7;
    var b8;
    
    // Cancels active beats
    // If you're seeing this... I'm sorry...
    const cancelBeats = () => {
        if( b1 != null ) {
            console.log(b1);
            b1.cancel();
        }

        if( b2 != null ) {
            b2.cancel();
        }

        if( b3 != null ) {
            b3.cancel();
        }

        if( b4 != null ) {
            b4.cancel();
        }
        
        if( b5 != null ) {
            b5.cancel();
        }

        if( b6 != null ) {
            b6.cancel();
        }

        if( b7 != null ) {
            b7.cancel();
        }

        if( b8 != null ) {
            b8.cancel();
        }
    
    }

    const handleStart = () => {
        // Prevents overlapping of audio
        cancelBeats();

        Tone.Transport.stop();
        handlePlayBack();
        Tone.Transport.start();
    }

    const handlePause = () => {
        Tone.Transport.pause();
    }

    const handleStop = () => {
        Tone.Transport.stop()
    }

    const emptySpaces = () => {

        let spacesTemp = JSON.parse(localStorage.getItem("spaces"));
        let curSpacesTemp = JSON.parse(localStorage.getItem("cur_space"));

        if(spacesTemp == null) {
            return false;
        } else if(spacesTemp.result == null) {
            return false;
        } else if(spacesTemp?.result?.numSpaces == 0) {
            return false;
        }

        if(curSpacesTemp == null) {
            return false;
        } else if(curSpacesTemp.data == null) {
            return false;
        } 
        
    }

    return (
        <>  
            { user != null ?
                <>
                   { emptySpaces() != false ? 
                    <>
                        <Taskbar type="spaces" handleStart={handleStart} handlePause={handlePause} handleStop={handleStop}/>
                        <Board />
                    </>
                    :
                    <>
                        <Taskbar type="spaces" handleStart={handleStart} handlePause={handlePause} handleStop={handleStop}/>
                        <NoSpaces/>
                    </>
                    }
                </>
            : 
                <>
                    <NoLogin/>
                </> 
            }
        </>
    );
}

export default Space;
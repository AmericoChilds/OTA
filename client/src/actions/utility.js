
import { noteAndOctave, notesToPlay } from "../components/Modules/Oscillator/util";

/*
========================
===       Data       ===
========================
*/

// Check if any necessary data is missing
export function dataMissing() {
    const api = JSON.parse(localStorage.getItem("api_data"));
    const user = JSON.parse(localStorage.getItem("profile"));
    const cur = JSON.parse(localStorage.getItem("cur_space"));

    var returnArray = {
        "api": false,
        "user": false,
        "cur": false,
    }

    if( api == null ) {
        returnArray["api"] = true;
    } 
    
    if( user == null ) {
        returnArray["user"] = true;
    } 
    
    if( cur == null ) {
        returnArray["cur"] = true;
    }

    return returnArray;
}

/*
========================
===   Music Theory   ===
========================
*/

export function getScale(root, mode, max, min) {
    //var processData = data.main[id];

    var scaleNotes = [];

    // Chromatic Scale
    if ( mode == 0 ) {
        return notesToPlay;
    // Major Scale
    } else if( mode == 1 ) {

        scaleNotes[0] = noteAndOctave(root, min);
        // Note at octave 0, start at min octave, go to max octave
        let startNote = root + min * 12;
        let endNote = root + max * 12;
        // Semitone relationship for the major scale
        let steps = [2, 2, 1, 2, 2, 2, 1];
        let stepCount = 0;

        // Save current note
        // Calculate the next step (whole or half)
        // Increase index
        let i = startNote; 

        while( i <= endNote ) {
            // Find note name for octave and save it to array
            scaleNotes[stepCount] = noteAndOctave(i, 0);
            // Calculate how many steps to take for next note
            let stepNow = steps[stepCount % 7];
            // Increase the counter for next note
            stepCount++;
            // Next note to jump to
            i = i + stepNow;
        }

        return scaleNotes;

    // Minor Scale
    } else if( mode == 2 ) {
        scaleNotes[0] = noteAndOctave(root, min);
        // Note at octave 0, start at min octave, go to max octave
        let startNote = root + min * 12;
        let endNote = root + max * 12;
        // Semitone relationship for the minor scale
        let steps = [2, 1, 2, 2, 1, 2, 2];
        let stepCount = 0;

        // Save current note
        // Calculate the next step (whole or half)
        // Increase index
        let i = startNote; 

        while( i <= endNote ) {
            // Find note name for octave and save it to array
            scaleNotes[stepCount] = noteAndOctave(i, 0);
            // Calculate how many steps to take for next note
            let stepNow = steps[stepCount % 7];
            // Increase the counter for next note
            stepCount++;
            // Next note to jump to
            i = i + stepNow;
        }

        return scaleNotes;
    } 
}


/*
===========================
===    Weather Data    ====
===========================
*/

export function processWD(storeAPI) {
    // Obtain the current space data
    let curData = JSON.parse(localStorage.getItem('cur_space'));
    let curAPI;
    if( storeAPI != null ) {
        curAPI = storeAPI;
    } else {
        curAPI = JSON.parse(localStorage.getItem('api_data'));
    }
    // Check if any of the Data is missing
    let missingData = dataMissing()
    // If any the data is missing, return
    if( missingData.api == false && missingData.cur == false && missingData.user == false ) {
        // Set default values

        let notesArray = {};

        /// Rhythm ///

        // Default: Plays every quarternote
        let rhythmData = 2;
        // Check if there's a desired value
        if( curData.data.api?.["r-data"] != null ) {
            
            rhythmData = curData.data?.api["r-data"];
            rhythmData = Math.round(curAPI[rhythmData]);
            
        }
        
        // Default: Rhythm interp method is mod
        let rhythmInterp = 0;
        // Check if there's a desired value
        if( curData.data?.api?.["r-interp"] != null ) {
            rhythmInterp = curData.data.api["r-interp"];
        }

        /// Pitch ///

        // Default: Pitch to jump by a third
        let pitchData = 2;
        // Check if there's a desired value
        if( curData.data?.api?.["p-data"] != null ) {
            pitchData = curData.data.api["p-data"];
            pitchData = Math.round(curAPI[pitchData]);
            
        }

        // Default: Pitch interp is mod
        let pitchInterp = 0;
        // Check if there's a desired value
        if( curData.data?.api?.["p-interp"] != null ) {
            pitchInterp = curData.data.api["p-interp"];
        }

        // Default: Major
        let scale = 1
        if( curData.data?.devices?.["scale"] != null ) {
            scale = curData.data.devices["scale"];
        }

        /// Processing Data ///

        // Process rhythm first
        notesArray = interpData( rhythmInterp, "r", rhythmData);
        
        // Process notes second
        notesArray = interpData( pitchInterp, "p", pitchData, notesArray, scale)
        if( curData.data.devices == null ) {
            curData.data.devices = {};
        }
        curData.data.devices["notes"] = notesArray;
   
        localStorage.setItem("cur_space", JSON.stringify(curData));
    } else {
        return;
    }
}

export function interpData( method, type, data, rArray, mode ) {

    var returnArray = {
        "0": null,
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null
    }

    // Mod Method 
    if( method == 0 ) {

        if( type == "r" ) {
            
            // Rhythm interval note will be played
            // Ensure that a note will be played 2 times
            let modJump = Math.max(data % 7, 1);

            let i = 0;
            // Loop through the length of the beat array
            while( i < Object.keys(returnArray).length) {
                
                // Always play on first beat
                if( i == 0 ) {
                    returnArray[0] = true;

                    // If the remainder is 6, simply set that beat as true and break
                    if( modJump == 6 ) {
                        returnArray[7] = true;
                        break;
                    }

                    i = i + modJump

                } else {
                    // Set current beat as true
                    returnArray[i] = true; 

                    i = i + modJump;
                }

            }

  
            return returnArray;

        } else {
            // Find beat to play on, get value
            // Set the return array to the rhythm array
            returnArray = rArray;
            // Set the root of the scale to data mod 12
            let root = data % 12;
            // Get notes according to scale
            let scaleNotes = getScale(root, mode, 4, 3);
            // Set increment of pitch
            let modJump = data % 7;
            // Current note
            let curNote = 0;

            for( let i = 0; i < Object.keys(returnArray).length; i++) {
                
                // Always play root note on first downbeat
                if( i == 0 ) {
                    returnArray[0] = scaleNotes[0];
                    curNote = (curNote + modJump) % 7;
                } else {
                    // If beat is active
                    if( returnArray[i] == true ) {
                        // Set it to the next note
                        returnArray[i] = scaleNotes[curNote];
                        // Increase cur note, mod it so it doesn't overflow notes array
                        curNote = (curNote + modJump) % 7;
                    }
                }

            }
            
            return returnArray;

        }
    } else if( method == 1 ) {

        if( type == "r") {

            // Rhythm interval note will be played
            // Ensure that a note will be played 2 times
            let modJump = Math.max(data % 7, 1);
            let probability = 1/modJump;

            let i = 0;
            // Loop through the length of the beat array
            while( i < Object.keys(returnArray).length) {
                
                // Always play on first beat
                if( i == 0 ) {
                    returnArray[0] = true;

                    i = i + 1;

                } else {
                    // Set current beat as true
                    let random = Math.random();
                    if (random < probability) {
                        returnArray[i] = true; 
                    }

                    i = i + 1;
                }

            }

  
            return returnArray;

        } else {
            
            // Find beat to play on, get value
            // Set the return array to the rhythm array
            returnArray = rArray;
            // Set the root of the scale to data mod 12
            let root = data % 12;
            // Get notes according to scale
            let scaleNotes = getScale(root, mode, 4, 3);


            for( let i = 0; i < Object.keys(returnArray).length; i++) {
                
                // Always play root note on first downbeat
                if( i == 0 ) {
                    let noteIndex = Math.floor(Math.random() * 7);
                    returnArray[0] = scaleNotes[noteIndex];
                } else {
                    // If beat is active
                    if( returnArray[i] == true ) {
                        let noteIndex = Math.floor(Math.random() * 7);
                        // Set it to the next note
                        returnArray[i] = scaleNotes[noteIndex];
                    }
                }

            }

            return returnArray;

        }

    }
}
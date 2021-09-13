import spaces from "../models/spaces.js";
import user from "../models/user.js";

export const newSpace = async(req, res) => {
    
    const {title, userID, func} = req.body;

    try {

        var existingUser;

        // If user is located in the database (not GoogleAuth)
        if( func ) {
            // Find associated user with email
            existingUser = await user.findOne({ userID })
            // Check if user exists
            if(!existingUser) return res.status(404).json({message: "User doesn't exist."});
            // Update correct ID for wavespace
            userID = existingUser._id;
        } 

        // Find wavespace associated with user
        var waveSpace = await spaces.findOne({ userID });
        // New space that's being added
        const addSpace = {
            title: title,
            date: new Date(),
            devices: null,
            api: null
        }
        // Result to return
        var returnSpaces;
        // If there's no wavespace associated, create one
        if (!waveSpace) {
            // State JSON object to stringify
            var spacesInsert = {
                [0]: {
                    title: addSpace.title,
                    date: addSpace.date,
                    devices: null,
                    api: null,
                } 
            }
            // Stringify the array
            spacesInsert = JSON.stringify(spacesInsert);
            // Create initial document
            waveSpace = await spaces.create({ 
                userID, 
                spaces: spacesInsert,
                numSpaces: 1
            })
        } else {
            // Stringified array
            var array = waveSpace.spaces;
            // Parse the string
            array = JSON.parse(array);
            // Find index to insert into next position
            var insertIndex = waveSpace.numSpaces;
            // Add index
            array[insertIndex] = {
                title: addSpace.title,
                date: addSpace.date,
                devices: null,
                api: null
            }
            // Stringify array again
            array = JSON.stringify(array);
            // Increase numSpaces
            insertIndex = insertIndex + 1;
            // Update document
            waveSpace = await spaces.findOneAndUpdate({userID}, {spaces: array, numSpaces: insertIndex});
        }

        // Return updated set of spaces
        res.status(200).json({ result: waveSpace });

    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }

}

export const delSpace = async(req, res) => {
    const { userID, func, id } = req.body;

    try {

        // Situated User's id
        // Obtain wavespace
        // Delete index
        // Refactor array
        // Update array document
        // Return document

        var existingUser;
        // If user is located in the database (not GoogleAuth)
        if( func ) {
            // Find associated user with email
            existingUser = await user.findOne({ userID })
            // Check if user exists
            if(!existingUser) return res.status(404).json({message: "User doesn't exist."});
            // Update correct ID for wavespace
            userID = existingUser._id;
        } 
        // Finds associated wavespace
        var waveSpace = await spaces.findOne({ userID });
        // Checks if wavespace exists for user
        if( !waveSpace ) res.status(404).json({message: "Wavespace doesn't exist"});
        // Parse spaces array
        var array = JSON.parse(waveSpace.spaces);
        // Checks that the id specified exists in the array
        if( !array[id] ) res.status(404).json({message: 'Space id does not exist'});
        // Remove index
        array[id] = { filter: true };
        var newArray = {}

        var flag = false;

        for( let j = 0; j < 3; j++) {
            console.log(j);
        }

        for( let i = 0; i < Object.keys(array).length; i++) {
            // Passed filtered index

            if( array[i].filter == null ) {
                console.log("hey");
                if( flag == false ) {
                    console.log("butt");
                    newArray[i] = array[i];
                } else {
                    newArray[i - 1] = array[i];
                }
            } else {
                flag = true;
            }

        }

        console.log(array);
        console.log(newArray);
        var newNumSpaces = waveSpace.numSpaces - 1;

        // Stringify array
        newArray = JSON.stringify(newArray);
        // Update document
        waveSpace = await spaces.findOneAndUpdate({userID}, {spaces: newArray, numSpaces: newNumSpaces});
        // Return result
        res.status(200).json({ result: waveSpace });

    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const updSpace = async(req, res) => {
    const { userID, func, title, devices, api, id } = req.body;

    try {

        // Obtain wavespace
        // Update index
        // Update array document
        // Return document
        console.log(title);
        var existingUser;

        // If user is located in the database (not GoogleAuth)
        if( func ) {
            // Find associated user with email
            existingUser = await user.findOne({ userID })
            // Check if user exists
            if(!existingUser) return res.status(404).json({message: "User doesn't exist."});
            // Update correct ID for wavespace
            userID = existingUser._id;
        } 
        // Finds associated wavespace
        var waveSpace = await spaces.findOne({ userID });
        // Checks if wavespace exists for user
        if( !waveSpace ) res.status(404).json({message: "Wavespace doesn't exist"});
        // Parse spaces array
        var array = JSON.parse(waveSpace.spaces);
        // Checks that the id specified exists in the array
        if( !array[id] ) res.status(404).json({message: 'Space id does not exist'});
        // Fill out fields
        if( title != null ) {
            array[id].title = title;
        }

        if( devices != null ) {
            array[id].devices = devices;
        }

        if( api != null ) {
            array[id].api = api;
        }
        // Stringify array
        array = JSON.stringify(array);
        // Update document
        waveSpace = await spaces.findOneAndUpdate({userID}, {spaces: array});
        // Return result
        res.status(200).json({ result: waveSpace });

    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }

}

export const getSpace = async(req, res) => {
    const { userID, func } = req.body;
    try {

        var existingUser;

        // If user is located in the database (not GoogleAuth)
        if( func ) {
            // Find associated user with email
            existingUser = await user.findOne({ userID })
            // Check if user exists
            if(!existingUser) return res.status(404).json({message: "User doesn't exist."});
            // Update correct ID for wavespace
            userID = existingUser._id;
        } 
        // Find associated wavespace
        var waveSpace = await spaces.findOne({ userID });
        // Return wavespace
        res.status(200).json({ result: waveSpace });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}




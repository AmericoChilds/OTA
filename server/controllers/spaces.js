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
    
}

export const updSpace = async(req, res) => {
    
}

export const getSpace = async(req, res) => {
    const { userID, func } = req.body;
    try {
        console.log( req.body );
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
        console.log(userID);
        var waveSpace = await spaces.findOne({ userID });

        res.status(200).json({ result: waveSpace });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}




import spaces from "../models/spaces.js"

export const newSpace = async(req, res) => {
    
    const {title} = req.body;

    try {

        console.log(title);

        res.status(200).json({ message: "hi"});

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
    const { userID } = req.body;
    try {

        // Find the Spaces associated with UserID
        const space = spaces.findOne(userID);

        if(!space) res.status(404).json({message: 'User has no spaces'})

        res.status(200).json({ result: space});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}




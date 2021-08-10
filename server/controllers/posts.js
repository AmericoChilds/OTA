import PostMessage from '../models/postMessage.js';

///////////////////////
///   Route Logic   ///
///////////////////////

export const getPosts = async (req, res) => {
    try {
        // Searches in database to find posts
        const postMessages = await PostMessage.find();
        // Returns success, post data
        res.status(200).json(postMessages);
    } catch (error) {
        // Returns error
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    // Data to post
    const post = req.body;
    // Data through mongodb model
    const newPost = new PostMessage(post);

    try {
        // Save data
        await newPost.save();
        // Success, "Created HTTP Code"
        res.status(201).json(newPost);
    } catch (error) {
        // Error code
        res.status(409).json({message: error.message});
    }
}
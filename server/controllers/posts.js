import mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);
        
        res.status(200).json(postMessages);
        
    } catch (error) {

        res.status(404).json({ message: error.message }); 
         
    }
}

export const createPost = async (req, res) => {
    
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator:req.userId, createdAt: new Date().toISOString()});

    try {

        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {

        res.status(409).json({ message: error.message });
        
    }
}

export const updatePost = async ( req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id } , { new: true });

    res.json(updatedPost);
}


export const deletPost = async ( req, res) => {
    const { id } = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');

     await PostMessage.findByIdAndRemove(id);

     res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    //   we can check user from req.userId is user authenticated or Not 
    if(!req.userId) return res.json({ message: 'Unauthenticated user ' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');

    // check the post in DB is post present or not
    const post = await PostMessage.findById(id);

    // check in the post like array is this user id is present in array or not, if then dislike else like 
    // in this case ID is of user id bcz searching in likes array there is all user Id 
    const index = post.likes.findIndex((id) => id == String(req.userId));

    if(index == -1){

        //if it is less then -1 then like the post
        post.likes.push(req.userId);

    } else {

         // in this case ID is of user id bcz searching in likes array there is all user Id 
           post.likes = post.likes.filter((id) => id != String(req.userId));

    }

    // after likes added and deleted,  post is updated then save into DB 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost); 
     
}
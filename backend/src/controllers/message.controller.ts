import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getUsersForSideBar = async(req: Request,res: Response) => {
    try{
        const loggedInUserId = (req as any).user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    }catch(error: any){
        console.log("Error in getUsersForSideBar controller ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getMessages = async(req: Request,res: Response) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = (req as any).user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(messages)
    }catch(error: any){
        console.log("Error in getMessages controller ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


export const sendMessage = async(req: Request,res: Response) => {
    try{
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = (req as any).user._id;
        
        let imageUrl;

        if(image){
            ///upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);

    }catch(error: any){
        console.log("Error in sendMessage controller ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

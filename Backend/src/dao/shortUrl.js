import UrlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/ErrorHandler.js";

export const saveShortUrl = async (shortUrl,longUrl,userId)=>{
    try{
        const newUrl = new UrlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user_id = userId;
        }
        await newUrl.save();
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists.");
        }
        throw new Error(err); 
    }
}

export const getShortUrl = async (shortUrl)=>{
    return await UrlSchema.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true } 
    );
}
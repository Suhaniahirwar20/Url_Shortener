import validator from "validator";
import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import { BadRequestError, NotFoundError } from "../utils/ErrorHandler.js";

export const createShortUrl =async (req,res,next)=>{
    try{
        const {url} = req.body;
        if (!url) throw new BadRequestError("URL is required");
        if (!validator.isURL(url)) throw new BadRequestError("Invalid URL format");

        const shortUrl = await createShortUrlWithoutUser(url);
        res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
    }catch(err){
        next(err);
    }
}

export const redirectFromShortUrl = async(req,res,next)=>{
    try{
        const {id} = req.params;
    
        const url = await getShortUrl(id);
        if (!url) throw new NotFoundError("Short URL not found");
        res.redirect(url.full_url);
    }catch(err){
        next(err);
    }
}
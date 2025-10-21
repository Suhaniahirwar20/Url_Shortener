import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url)=>{
    const shorturl = generateNanoId(7);
    if(!shorturl)  throw new Error("Short URL not generated");
    await saveShortUrl(shorturl,url);
    return shorturl;
}

export const createShortUrlWithUser = async (url,userId)=>{
    const shorturl = generateNanoId(7);
    await saveShortUrl(shorturl,url,userId);
    return shorturl;
}
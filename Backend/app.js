import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/ErrorHandler.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/create",shortUrl);
app.get("/:id",redirectFromShortUrl);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT,async ()=>{
    await connectDB()
    console.log(`✅ Server is running at http://localhost:${PORT}/`);
});
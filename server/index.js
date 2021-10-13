import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
// importing our router
import postRoutes from './routes/posts.js';
const app = express();
import dotenv from 'dotenv';

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes); /* we will get our page on 'http://localhost:5000/posts'*/
dotenv.config();

app.get('/',(req,res)=>{
    res.send('Hello to Memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
            .then(() => app.listen(PORT,console.log(`Server Running on Port: ${PORT}`)))
            .catch((error) => console.log("mongoose => "+error.message));

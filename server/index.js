import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
// importing our router
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
const app = express();
import dotenv from 'dotenv';

dotenv.config();


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes); /* we will get our page on 'http://localhost:5000/posts'*/
app.use("/user", userRoutes);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.29pp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
            .then(() => app.listen(PORT,console.log(`Server Running on Port: http://localhost:${PORT}`)))
            .catch((error) => console.log("mongoose => "+error.message));

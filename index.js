import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';   //for the database
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import jwt from "jsonwebtoken";
import cors from 'cors';
import dotenv from 'dotenv'; //for the environment variables
dotenv.config();

const app = express();  // const used so that this variable cannot be changed again

app.use(cors())
app.use(bodyParser.json())


app.use(
    (req,res,next)=>{
        const tokenString = req.header("Authorization") //to get the token from the header
        if (tokenString != null){
            const token = tokenString.replace("Bearer ", "")
            

            jwt.verify(token, process.env.JWT_KEY, 
                (err,decoded)=>{
                    if(decoded != null){
                        console.log(decoded)
                        req.user = decoded
                        next()     //to send for the req to the required.
                    }else{
                        console.log("Invalid Token")
                        res.status(403).json({
                            message: "Invalid Token"
                        })
                    }
                }
            )
        }else{
            next() //this is for if token not provided (product added without token)
        }  
    }
) //middleware

mongoose.connect(process.env.MONGODB_URL)
.then( ()=> {
    console.log('Connected to database')
}).catch(()=> {
    console.log('Database connection failed')
})


app.use("/students", studentRouter)
app.use("/products", productRouter)
app.use("/users", userRouter)

app.listen( 3000, 
    ()=>{
        console.log('Server is running port 3000');
    }   //arrow function
)

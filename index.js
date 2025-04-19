import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';   //for the database
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();  // const used so that this variable cannot be changed again

app.use(bodyParser.json())
mongoose.connect("mongodb+srv://admin:diara123@cluster0.gmahg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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

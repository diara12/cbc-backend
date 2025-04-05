import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';   //for the database
import Student from './models/student.js';  //importing the model

const app = express();  // const used so that this variable cannot be changed again

app.use(bodyParser.json())
mongoose.connect("mongodb+srv://admin:diara123@cluster0.gmahg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then( ()=> {
    console.log('Connected to database')
}).catch(()=> {
    console.log('Database connection failed')
})



app.get("/", 
    (req,res)=> {    
            Student.find().then(
                (data)=>{
                    res.json(data)  //data to to be found in the database
                }
            )
    }
)

app.delete("/", 
    (req,res)=> {    //this is put since this function from express framework
        res.json(
            {
                message: 'this is a delete request'
            }
        )   //response is sent
        }
)


app.post("/", 
    (req,res)=> {    //this is put since this function from express framework
        console.log(req.body)


        const student = new Student(    //student--> is the database name which is been saved
            {
                name: req.body.name,
                age: req.body.age,
                stream: req.body.stream,
                email: req.body.email
            }
        )

        student.save().then(()=> {
            res.json({
                message: 'Student saved successfully'
            })
        }).catch(()=> {
            res.json({
                message: 'Failed to add student'
            })
        })
    }
             
)

app.put("/",
    (req,res)=> {    //this is put since this function from express framework
        res.json(
            {
                message: 'this is a put request'
            }
        )   //response is sent
        } 
)

app.listen( 3000, 
    ()=>{
        console.log('Server is running port 3000');
    }   //arrow function
)

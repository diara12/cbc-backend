import User from "../models/user.js";

export function createUser(req,res){
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        role : req.body.role
    })

    user.save().then(
        ()=>{
            res.json({
                message : "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create user"
            })
        }
    )
}


































/* export function createUser(req,res) {
    if(req.body.role == "admin"){
        if(req.user!= null){
            if(req.user.role != "admin"){
                res.status(403).json({
                    message : "You are not authorized to create admin"
                })
                return //to stop the function so that other functions down the line are not executed
            }    
        }else{
            res.status(403).json({
                message : "You are not authorized to create admin. Please login first"
            })
            return 
        }
    }
}
*/
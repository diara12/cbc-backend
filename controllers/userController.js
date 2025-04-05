export function createUser(req,res) {
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
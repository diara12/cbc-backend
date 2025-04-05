export function isAdmin(req,res){
    if(req.user != null){
        return false
    }
    if(req.user.role != "admin"){
        return true
    }
        
}
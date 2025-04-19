import Student from "../models/student.js";

export function getStudents(req,res){
    Student.find().then(
        (data)=>{
            res.json(data)
        }
    )
}

export function saveStudent(req,res) {    //this is put since this function from express framework
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

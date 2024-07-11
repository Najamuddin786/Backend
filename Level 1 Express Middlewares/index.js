const express=require('express')
const app=express()
const port=3000
const fs=require('fs');
const morgan = require('morgan');

//   Middleware 
app.use(express.json());
app.use(morgan("tiny"))


const data=JSON.parse(fs.readFileSync('./db.json','utf8'))

app.get(['/','/get-users'],(req,res)=>{
    

    res.status(200).send(data)
})


app.post('/add-user',(req,res)=>{

    data.students.push(req.body)
    fs.writeFileSync('./db.json',JSON.stringify(data,null,2))
 
    res.status(201).send("success")
})

app.put(`/user/:id`,(req,res)=>{
    const userId = parseInt(req.params.id);
    console.log(userId)

    res.status(201).send('Ready')
})

app.delete('/user/:id',(req,res)=>{
    const userId = parseInt(req.params.id);
    data.students.splice(userId,1)
    fs.writeFileSync('./db.json',JSON.stringify(data,null,2))

    console.log(data.students)
    res.status(201).send("successful deletion")
})










app.listen(port,()=>{
    console.log("Server is running port "+port)
})
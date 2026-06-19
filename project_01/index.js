const express = require('express')
// const users = require('./MOCK_DATA.json')
const mongoose = require('mongoose')
const fs = require('fs')

const app = express()
const PORT = 8000

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/demo').then(()=>{console.log("MongoDb Connected")}).catch((error)=>{console.log("Error", error)})

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobTitle:{
        type: String, 
    },
    gender:{
        type: String, 
    },

})

const User = mongoose.model('user',userSchema)

// MiddleWare
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{    
    fs.appendFile('./log.txt',`\n${Date.now()} ${req.method} ${req.path}`,(err,data)=>{
        next()
    })
})

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 2", )
//     next()
// })

// Routes
// app.get('/users',(req,res)=>{
//     const html = `
//     <ul>
//         ${users.map((user)=> `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `
//     res.send(html)
// })

app.get('/users',async(req,res)=>{
    const allDbUsers = await User.find({})
    const html = `
    <ul>
       ${allDbUsers.map((user) => `<li> ${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `
    return res.send(html)
})

// REST api


// app.get('/api/users', (req,res)=>{
//     return res.json(users)
// })

app.get('/api/users', async(req,res)=>{
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})


// app.get('/api/users/:id',(req,res)=>{
//         const id = Number(req.params.id)
//         const user = users.find((user)=> user.id===id)
//         return res.json(user)
//     })
    
// app.patch('/api/users/:id',(req,res)=>{
//      return res.json({status : "pending"})
//     })
        
// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status : "pending"})
//     }) 
    // As all the above have same route /api/users/:id we can do it the other way
            
// app.route('/api/users/:id').get((req,res)=>{
//     const id = Number(req.params.id)
//     const user = users.find((user)=> user.id===id)
//     if(!user){
//         res.status(404).json({error: "User Not Found"})
//     }
//     return res.json(user)
// }).patch((req,res)=>{
//     const id = Number(req.params.id)
//     const user = users.findIndex(user=> user.id === id)
//     return res.json({status : "pending"})
// }).delete((req,res)=>{
//     const delId = Number(req.params.id)
//     const user = users.findIndex(user=> user.id==delId)
//     users.splice(user,1)
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users,null,2),(err)=>{
//         return res.json({status : "success", message: `User with ID ${delId} deleted`})
//     })
// })

app.route('/api/users/:id').get(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) res.status(404).json({msg: "User Not Found"})
    return res.json(user)
}).patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, {lastName:"Singh"})
    return res.json({msg: "Success"})

}).delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg: "Success"})

})

app.post('/api/users', async(req,res)=>{
    const body = req.body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        res.status(400).json({msg: "All fields are required"})
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    res.status(201).json({msg: "Success"})
})

app.listen(PORT, ()=>{console.log(`Server started at ${PORT}`)})


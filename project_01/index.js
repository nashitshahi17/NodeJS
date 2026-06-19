const express = require('express')
// const users = require('./MOCK_DATA.json')
const {logreqres} = require("./middlewares")
const userRouter = require('./routes/user.js')
const {connectMongoDB} = require("./connection.js")

const app = express()
const PORT = 8000

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/demo')

// MiddleWare
app.use(express.urlencoded({extended:false}))
app.use(logreqres("log.txt"))

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 2", )
//     next()
// })

// Routes

app.use('/users',userRouter)


// app.get('/users',(req,res)=>{
//     const html = `
//     <ul>
//         ${users.map((user)=> `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `
//     res.send(html)
// })



// REST api


// app.get('/api/users', (req,res)=>{
//     return res.json(users)
// })




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



app.listen(PORT, ()=>{console.log(`Server started at ${PORT}`)})


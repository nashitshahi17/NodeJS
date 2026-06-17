const fs = require('fs')
const os = require('os')

// Sync blocking
// fs.writeFileSync('./test.txt',"Hey There")


// Async non blocking
// fs.writeFile('./test.txt',"Hello",(err)=>{})

// const result = fs.readFileSync('./Notes.txt','utf-8')
// console.log(result)


// fs.readFile('./Notes.txt','utf-8',(err,result)=>{
//     if(err){
//         console.log("Error: ", err)
//     }else{
//         console.log(result)
//     }
// })

// fs.appendFileSync('./test.txt',`${Date.now()} Hi I am Node\n`)
// console.log(os.cpus().length); To know about the cpu cores

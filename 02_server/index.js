const http = require('http')
const fs = require('fs')
const url = require('url')

function handler(req,res){
    if (req.url == '/favicon.ico') return res.end();
    const log = `${Date.now()} ${req.url} ${req.method} New Request Recieved\n`
    const myUrl = url.parse(req.url,true)
    // console.log(myUrl);
    
    fs.appendFile('./log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':
                if(req.method=== 'GET') res.end("HomePage")
                break
            case '/about':
                const qp = myUrl.query.name
                res.end(`Hi ${qp}`)
                break
            case '/search':
                const search = myUrl.query.search_query
                res.end(`Here are your search result from ${search}`)
                break
            case '/signup':
                if(req.method==='GET') res.end("This is a singup form")
                else if(req.method==="POST"){
                    //DB query
                    res.end("Success") 
                }
                break
            default:
                res.end("404 Not found")
        }
    });
}
// This is another way of creating sever with anonymous function or arrow function
// const myServer = http.createServer((req, res)=>{ 
const myServer = http.createServer(handler)
//     if (req.url == '/favicon.ico') return res.end();
//     const log = `${Date.now()} ${req.url} ${req.method} New Request Recieved\n`
//     const myUrl = url.parse(req.url,true)
//     // console.log(myUrl);
    
//     fs.appendFile('./log.txt',log,(err,data)=>{
//         switch(myUrl.pathname){
//             case '/':
//                 if(req.method=== 'GET') res.end("HomePage")
//                 break
//             case '/about':
//                 const qp = myUrl.query.name
//                 res.end(`Hi ${qp}`)
//                 break
//             case '/search':
//                 const search = myUrl.query.search_query
//                 res.end(`Here are your search result from ${search}`)
//                 break
//             case '/singup':
//                 if(req.method==='GET') res.end("This is a singup form")
//                 else if(req.method==="POST"){
//                     //DB query
//                     res.end("Success") 
//                 }
//                 break
//             default:
//                 res.end("404 Not found")
//         }
//     })
// })  // The arrow function is responsible for processing the incoming request 
myServer.listen(8000,()=>{console.log("Server Started")})



console.log("Hello from JS")

// const math = require('./math') It is one approach in which during printing we have to use math.
const {add, sub} = require('./math') // In this we have destructured it


// console.log(math.add(5,2))
// console.log(math.sub(5,2))

console.log(add(2,5))
console.log(sub(5,2))
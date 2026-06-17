function add(a, b){
    return a+b
}

function sub(a,b){
    return a-b
}

// module.exports = add;
// module.exports = sub;  Wrong way because it will override the upper function and the value will be lost
// example if the user call math it will do subtract only not add so the better approach is to return in object

module.exports = {
    add,
    sub,
}
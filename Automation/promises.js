const fs =  require("fs");

console.log("Before Promise call");

let p_readFile = fs.promises.readFile("test1.txt");

p_readFile.then(printData);
p_readFile.catch(printError);

console.log("After promise call");

function printData(data){
    console.log(data+"");
}

function printError(err){
    console.log(err);
}
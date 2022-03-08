// File system module
const fs = require("fs");
const ca = require("./calc");

console.log(ca);

fs.appendFileSync("Test.txt","Hi there, How you doing ?\n");
fs.appendFileSync("Test.txt",":cry: :sad:\n");

let data = fs.readFileSync("Test.txt","utf-8");
console.log(data);
fs.writeFileSync("Test.txt","Cleared Everything above\n");
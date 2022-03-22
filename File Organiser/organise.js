let helpObj = require("./commands/help");
let sgtObject = require("./commands/sgt")
let treeObj = require("./commands/tree");
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];
switch(command){
    case "help":helpObj.help();
        break;
    case "sgt":sgtObject.segregateFiles(path);
        break;
    case "tree":treeObj.tree(path);
        break;
    default: console.log("No such command exist.\nPlease use help command to find valid commands.\n");
}
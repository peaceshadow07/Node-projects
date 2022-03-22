// Import modules for working with paths and filesystem
const fs = require("fs");
const path = require("path");

function tree(srcPath , indent = ""){
    // Authenticate path
    if(!fs.existsSync()){
        // Print base folder name 
        console.log(indent + "|__"+path.basename(srcPath));
        indent+="\t";
    }else{
        console.log("No such directory exist");
    }
    // Fetch all files/folders within the given sorce path
    let subFolders = fs.readdirSync(srcPath);
    for(let i = 0; i < subFolders.length; i++){
        let filePath = path.join(srcPath,subFolders[i]);
        let isFile = fs.lstatSync(filePath).isFile();
        if(!isFile){
            // recursive call to sub folder if not file
            tree(filePath,indent )
            
        }else{
            // if file, print its name
            console.log(indent+ "|__"+subFolders[i]);
        }
    }
}

// Export module to use in main application
module.exports = {
    tree : tree
};
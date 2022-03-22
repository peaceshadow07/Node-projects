const fs =  require("fs");
const path = require("path");

const types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xlx", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    apps: ["exe", "dmg", "pkg", "deb"],
    images: ["png", "jpg", "jpeg"]
}

function segregateFiles(srcPath){
    // If not path defined for sgt command then set path to current directory
    if(srcPath == undefined){
        srcPath = process.cwd();
    }

    let segregatedPath = path.join(srcPath, "Segregated Files");
    // Check if segregated folder exist or not , if not then create one
    if(!fs.existsSync(segregatedPath)){
        fs.mkdirSync(segregatedPath);
    }

    // Array of all files/Directories present in srcPath
    let filesArr = fs.readdirSync(srcPath);
    
    for(let i = 0; i < filesArr.length; i++){
        // Path of every file/directory
        let fullPathOfFile = path.join(srcPath,filesArr[i]);
        // Check if it is file or folder
        let isFile = fs.lstatSync(fullPathOfFile).isFile();
        if(isFile){
            // Get extension of file
            let fileExtension = path.extname(filesArr[i]).split('.')[1];
            // Get subfolder name for file extension type ex. media for img,jpg,jpeg etc.
            let subFolder = getFolderName(fileExtension);
            // Copy current file to it's respective folder
            copyFileToDest(srcPath, fullPathOfFile, subFolder);
        }
    }

}

function getFolderName(extension){
    // Traverse over types object to find sub folder name 
    for(let key in types){
        for(let i = 0; i < types[key].length; i++){
            if(extension == types[key][i])
                return key;
        }
    }
    // If no type found for the respective extension then miscellaneous
    return "miscellaneous";
}

function copyFileToDest(srcPath, filePath, Folder){
    // Path to destination folder inside segregated section
    let destFolderPath = path.join(srcPath, "Segregated Files",Folder);
    
    // if destination folder exist then do nothing else create folder
    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }
    // Fetch file name
    let fileName = path.basename(filePath);
    // create destination path for particular file
    let destFileName = path.join(destFolderPath,fileName);
    // copy content of file from original location to destination location
    fs.copyFileSync(filePath, destFileName);
}


// Export methods defined here 
module.exports = {
    segregateFiles: segregateFiles
};
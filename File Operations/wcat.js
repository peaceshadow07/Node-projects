const fs = require("fs");
let invalidInput = false;
let input = process.argv.slice(2);

let files = [];
let options = [];


for( let i = 0; i < input.length; i++){
    if(input[i][0] !== '-'){
        if(fs.existsSync(input[i]) === true)
            files.push(input[i]);
        else{
            console.log("One or more file does not exist.");
            invalidInput = true;
        }
            
    }else{
        if(input[i][1] === 's' || input[i][1] === 'n' || input[i][1] === 'b')
            options.push(input[i][1]);
        else{
            console.log(`Invalid command ${input[i]}`);
            invalidInput = true;
        }
            
    }
}

if(!invalidInput){
    let content = "";
    for(let i = 0; i < files.length; i++){
        content +=  fs.readFileSync(files[i]) + "\n";
    }

    if(options.length === 0){
        console.log(content);
    }else{
            if(options.indexOf('s') != -1 ){
                removeEmptyLines(content);
            }
            if(options.indexOf('n') != -1 && options.indexOf('b') != -1){
                if(options.indexOf('n') < options.indexOf('b') )
                    content = numberLine(content);
                else
                    content = nonEmptyLine(content);
            }else{
                if(options.indexOf('n') != -1){
                    content = numberLine(content);
                }else if(options.indexOf('b') != -1){
                    content = nonEmptyLine(content);
                }
            }
        console.log(content);
    }

}


function numberLine(file){
    let fileArr = file.split("\n");
    let number = 1;
    file = "";
    for( let i = 0; i < fileArr.length; i++){
        file += `${number}.` + fileArr[i] + "\n";
        number++;
    }
    return file;
}


function nonEmptyLine(file){
    let fileArr = file.split("\n");
    let number = 1;
    file = "";
    for( let i = 0; i < fileArr.length; i++){
        if(fileArr[i].trim().length > 0){
            file += `${number}.` + fileArr[i] + "\n";
            number++;
        }else{
            file += fileArr[i]+"\n";
        }
    }
    return file;
}

function removeEmptyLines(file){
    let fileArr = file.split("\n");
    let fileTemp = [];
    
    for (let i = 1; i < fileArr.length; i++){
        if (fileArr[i] == " \r" && fileArr[i - 1] == " \r") {
            fileArr[i] = null;
        }
        else if (fileArr[i] == " \r" && fileArr[i - 1] == null) {
            fileArr[i] = null;
        }
    }
    for(let i = 0; i < fileArr.length; i++){
        if(fileArr[i] != null){
            fileTemp.push(fileArr[i]);
        }
    }
    file = fileTemp.toString();
    console.log(file);
    // return fileTemp.toString();
}



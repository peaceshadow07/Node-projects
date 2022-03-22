function help(){
    console.log(
        `These are some Organise commands used in various situations : 

        1. node organise.js tree <path> 
        for 
        2. node organise.js help
        3. node organise.js sgt <path> 
        for segregation of files as per file extension type
        `
    );
}

module.exports = {
    help : help
};
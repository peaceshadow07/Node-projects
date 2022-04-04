// Include modules needed in this project   
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
// Include methods from external files
const {getProjects} = require("./projects");


// declare URls used 
    // Url to hit in the very begining
let url = "https://github.com/topics";
// url to be used for relative links
let baseUrl = "https://github.com";


// Request to the url
request(url, callback);

// callback function to handle callback response of request
function callback(err, response, html){
    if(err){
        console.log("Error : " + err);
    }else{
        getTopics(html);
    }
}

// function to fetch top 3 topics and their relative link
function getTopics(html){
    let selectTool = cheerio.load(html);
    // let topics = selectTool(".py-4 .f3.lh-condensed.mb-0.mt-1.Link--primary");
    let topicsArr = selectTool(".py-4 .no-underline.flex-1.d-flex.flex-column");
    // console.log(topics.text());   
    // let relativeLink = selectTool('.py-4 .no-underline.flex-1.d-flex.flex-column').attr("href");
    for(let  i = 0; i < 3; i++){
        // fetch relative link to form complete link
        let relativeLink = selectTool(topicsArr[i]).attr("href");
        // get topic name to create folder of the topic
        let topicName = path.basename(relativeLink);
        // console.log(topicName);

        // topicPath to store pdf in this location
        let topicFolderPath = path.join(__dirname,topicName);
        // Create folder if not exist already
        if(!fs.existsSync(topicFolderPath)){
            fs.mkdirSync(topicFolderPath);
        }
        // get topic link to get projects
        let topicLink = baseUrl + relativeLink;
        //  call to getProjects from projects.js to fetch top 8 projects
        getProjects(topicLink,topicName,topicFolderPath);
        // console.log(topicLink);
    
    }

}
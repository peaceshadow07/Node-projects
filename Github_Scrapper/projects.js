// Include modules needed in this project   
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
const {getIssues} = require("./issues");
const process = require('process');
// Base URL to form relative links
let baseUrl = "https://github.com";


function getProjects(topicLink,topicName,topicFolderPath){
    request(topicLink, function(error, response, body){
        if(error){
            console.log("error : " + error);
            return;
        }else{
            // load html body ion selector tool
            let selectTool = cheerio.load(body);
            // Get Project link using topicLink from main.js
            let projectsArr = selectTool(".text-bold.wb-break-word");
            for(let i = 0; i < 8; i++){
                // get relative link of project
                let relLink = selectTool(projectsArr[i]).attr("href");
                // create issues link
                let issueLink = baseUrl + relLink + "/issues";
                // fetch name to create pdf
                let projectName = selectTool(projectsArr[i]).text().split("\n")[1].trim().split(".").join("");
                // Call getissues method from issues.js to add issue text and link to pdf
                getIssues(issueLink,projectName,topicFolderPath,topicLink);
                
            }
        }
    });
}

module.exports = {
    getProjects : getProjects
}
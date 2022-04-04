// Include modules needed in this project   
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
const process = require('process');
const pdf = require('pdfkit');
const PDFDocument = require("pdfkit");

// Base URL to form relative links
let baseUrl = "https://github.com";

function getIssues(issuesLink, projectName,topicFolderPath,topicLink){
    request(issuesLink, function(error, response, body){
        if(error){
            console.log("Error : " + error);
        }else{
            
                const doc = new PDFDocument({fond : 'Courier'});
                let selectTool = cheerio.load(body);
                let issuesArr = selectTool(".d-block.d-md-none.position-absolute");
                // create pdf file
                doc.pipe(fs.createWriteStream(`${topicFolderPath}/${projectName}.pdf`));
                // Add Project name to every new page added to pdf
                doc.on('pageAdded', () => doc.fontSize(12).fillColor('black').text(projectName.toUpperCase(),{link : topicLink}));
                // add title to the first page of pdf
                doc.fontSize(24).fillColor('green').text(projectName.toUpperCase()+"\n\n",{link : topicLink});
                for(let i = 0; i < issuesArr.length; i++){
                    // get issue text 
                    let issueText = selectTool(issuesArr[i]).attr("aria-label").split(".")[1].trim();
                    // get issue link
                    let relLink = selectTool(issuesArr[i]).attr("href");
                    let issueLink = baseUrl + relLink;
                    // add content to pdf
                    doc.fontSize(12).fillColor('black').text("ISSUE -> " + issueText + "\n");
                    doc.fillColor('green').text(`${issueLink}\n\n`,{link : issueLink, underline: true});
                    
                }
                // close document 
                doc.end();
            
        }
    });
}

module.exports = {
    getIssues : getIssues
}

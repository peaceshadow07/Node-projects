// modules 
const request = require("request");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const allMatchObj = require("./allMatch");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const baseLink = "https://www.espncricinfo.com";
request(url , callback);

function callback(error, response, body){
    if(error){
        console.log("Error : " + error);
    }
    else{
        handleHtml(body);
    }
}

let iplPath = path.join(__dirname, "IPL");
if(!fs.existsSync(iplPath)){
    fs.mkdirSync(iplPath);
}

function handleHtml(html) {
    let selectTool = cheerio.load(html);
    let anchorElem = selectTool('a[data-hover="View All Results"]');
    let relativeLink = anchorElem.attr("href");
    let fullLink = baseLink + relativeLink;
    // console.log("main" + fullLink);
    allMatchObj.getAllMatch(fullLink);

    
}
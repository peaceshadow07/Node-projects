// modules 
const request = require("request");
const cheerio = require("cheerio");
const { get } = require("request");
const scoreObj = require("./scorecard");

const baseLink = "https://www.espncricinfo.com";
function getAllMatch(url) {
    request(url, callback);
}

function callback(error, response, body){
    if(error){
        console.log("Error : " + error);
    }
    else{
        extractAllMatchLink(body);
    }
}

function extractAllMatchLink(html) {
    let selectTool = cheerio.load(html);
    let scorecardLinkArr = selectTool('a[data-hover="Scorecard"]');
    for(let i = 0; i < scorecardLinkArr.length; i++){
        let relativeLink = selectTool(scorecardLinkArr[i]).attr("href");
        let fullLink = baseLink + relativeLink;
        // console.log(i + 1 + "). "+fullLink);
        scoreObj.getScore(fullLink);
        // break;
    }

}

module.exports = {
    getAllMatch : getAllMatch
};
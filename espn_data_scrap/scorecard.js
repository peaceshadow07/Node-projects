const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const { append } = require("cheerio/node_modules/domutils");

function getScorecard(url){
    request(url, callback);
}

function callback(error, response, body){
    if(error){
        console.log(error);
    }else{
        getMatchDetails(body);
    }
}

function getMatchDetails(html) {
    let selectTool = cheerio.load(html);
    
    let desc = selectTool(".match-header-info.match-info-MATCH");
    let descArr = desc.text().split(",");
    // 1. get venue
    let venueOfMatch = descArr[1];
    // 2. match date
    let dateOfMatch = descArr[2];
    // 3. Team names
    let teams = selectTool(".match-header .name");
    let team1 = selectTool(teams[0]).text();
    let team2 = selectTool(teams[1]).text();
    console.log(team1,team2);
    // 4. result
    let resultElem = selectTool(".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text");
    let matchResult = resultElem.text();

    // 5. Innings
    let allBatsmenTable = selectTool(".table.batsman tbody");
    // console.log(allBatsmenTable.text());
    let htmlString = "";
    for(let i=0;i<allBatsmenTable.length;i++){
        htmlString += selectTool(allBatsmenTable[i]).html();

        let allRows = selectTool(allBatsmenTable[i]).find("tr");
        for (let i = 0; i < allRows.length; i++) {
            let row = selectTool(allRows[i]).find("td");
            if(selectTool(selectTool(allRows[i]).find("td")[0]).text() == "Extras"){
               let tmp = team1 ;
               team1 = team2;
               team2 = tmp;
            }
                
            if(selectTool(selectTool(allRows[i]).find("td")[0]).hasClass("batsman-cell")){
                let playerName = selectTool(row[0]).text().trim();
                let runs = selectTool(row[2]).text();
                let balls = selectTool(row[3]).text();
                let fours = selectTool(row[5]).text();
                let sixes = selectTool(row[6]).text();
                let sr = selectTool(row[7]).text();
                console.log(`${playerName} | ${runs} | ${balls} | ${fours} | ${sixes} | ${sr}`);
                // console.log(team1,"---",team2);
                processInformation(dateOfMatch, venueOfMatch, matchResult, team1, team2, playerName, runs, balls, fours, sixes, sr);

            }

        }
    }
}


function processInformation(dateOfMatch, venueOfMatch, matchResult, ownTeam, opponentTeam, playerName, runs, balls, fours, sixes, sr){
    let teamNamePath = path.join(__dirname,"IPL", ownTeam);
    
    if(!fs.existsSync(teamNamePath)){
        fs.mkdirSync(teamNamePath);
    }
    let playerPath = path.join(teamNamePath, playerName+".xlsx");
    let content = excelReader(playerPath, playerName);

    let playerObj = {
        dateOfMatch,
        venueOfMatch,
        matchResult,
        ownTeam,
        opponentTeam,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr
    };

    content.push(playerObj);
    excelWriter(playerPath, content, playerName);

}

function excelReader(playerPath, sheetName){
    if(!fs.existsSync(playerPath)){
        return [];
    }
    let workBook = xlsx.readFile(playerPath);
    // console.log(workBook.Sheets);
    let excelData = workBook.Sheets[sheetName];
    // console.log(excelData);
    let playerObj = xlsx.utils.sheet_to_json(excelData);
    return playerObj;
}

function excelWriter(playerPath, jsObject, sheetName){
    // Create new workbook
    let newWorkBook = xlsx.utils.book_new();
    // create new worksheet
    let newWorkSheet = xlsx.utils.json_to_sheet(jsObject);
    // append worksheet to workbook
    xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, sheetName);
    // Attempt to write or download workbook data to file
    xlsx.writeFile(newWorkBook, playerPath);
}

module.exports = {
    getScore : getScorecard
};
// Modules included
const request = require("request");
const cheerio=require("cheerio");

// request to the url to get data
request("https://www.worldometers.info/coronavirus/", callback);


function callback(err, res, body) {
    if(err){
        console.error("error", err);
    }
    else {
        handleHtml(body);
    }
}

function handleHtml(html) {
    
    let selecTool = cheerio.load(html);

    let coronaStatsArr = selecTool(".maincounter-number");

    // console.log(coronaStats.text());

    let totalCases = selecTool(coronaStatsArr[0]).text();
    console.log("Total Cases -> " + totalCases);

    let totalDeaths = selecTool(coronaStatsArr[1]).text();
    console.log("Total Deaths -> " + totalDeaths);

    let totalRecovered = selecTool(coronaStatsArr[2]).text();
    console.log("Total Patients Recovered -> " + totalRecovered);
}
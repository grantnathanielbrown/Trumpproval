const fs = require("fs");
const papa = require("papaparse");
const moment = require('moment');

const stream = fs.createReadStream("/Users/grant/Desktop/Trumpproval/src/convert/data/TrumpTweets_Jan2017-_END - tweets_01-08-2021.csv");

function convert(results) {
    console.log(results.data);

    let reversedData = results.data.reverse();
    reversedData.pop();

    let transformedData = [];

    reversedData.forEach( (item) => {

        let copyOfPrevious = transformedData.slice(-1);

        if (copyOfPrevious[0]?.date !== moment(item[7].split(' ')[0]).format('MMM. D, YYYY')) {
            
            let dataPoint = {
                date: undefined,
                numberOfTweets: 1
            }
           
            dataPoint.date = moment(item[7].split(' ')[0]).format('MMM. D, YYYY');
            transformedData.push(dataPoint);

        } else {
            transformedData[transformedData.length - 1].numberOfTweets += 1;
        }
    })
    console.log(transformedData.slice(0,20));
    fs.writeFile("/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/tweets.json", JSON.stringify(transformedData), function (err) {
        if (err) return console.log(err);
        console.log('The data was written');
        });
}


papa.parse(stream, {
    
    complete: (results) => convert(results)

})
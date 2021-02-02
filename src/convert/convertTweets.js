const fs = require("fs");
const papa = require("papaparse");

const stream = fs.createReadStream("/Users/grant/Desktop/Trumpproval/src/convert/data/TrumpTweets_Jan2017-_END - tweets_01-08-2021.csv");

function convert(results) {
    console.log(results.data);

    let data = results.data;
    data.shift();

    let transformedData = [];

    data.forEach( (item) => {

        let copyOfPrevious = transformedData.slice(-1);

        if (copyOfPrevious[0]?.date !== item[7].split(' ')[0]) {
            
            let dataPoint = {
                date: undefined,
                numberOfTweets: 1
            }

            dataPoint.date = item[7].split(' ')[0];
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
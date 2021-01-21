// const http = require('http');
const fs = require("fs");
const papa = require("papaparse");

const express = require("express");
const app = express();
// http.createServer( (req,res) => {
//     let file = fs.createWriteStream("/Users/grant/Desktop/TrumParrot/src/convert/transformed_data");
//     let transformedData = convert();
//     console.log();
//     transformedData.pipe(file);
//     res.end();
// }).listen(8080)


app.set("port", 8080);

app.listen(app.get("port"), () => {
  console.log("xd");
});

app.get("/", (req,res) => {
    let file = fs.createWriteStream("/Users/grant/Desktop/TrumParrot/src/convert/transformed_data/sample.json");
    let transformedData = convert()
        console.log("test");
        console.log(transformedData);
        transformedData.pipe(file);
    res.end();
})


function getAverageRating(arr) {
    let rating =  arr.reduce((accumulator, currentValue) => accumulator + currentValue) / arr.length;
    return parseFloat(rating.toFixed(2));
}

function convert () {
    let transformedData = [];
    const stream = fs.createReadStream("/Users/grant/Desktop/TrumParrot/src/convert/data/trump_sample.csv")
    papa.parse(stream, {
    
        complete: (results) => {
    
            let reversedData = results.data.reverse();
            reversedData.pop();
            
            // console.log("Parsing complete:", reversedData);
            // let transformedData = [];
            reversedData.forEach( (item) => {
                
                let copyOfPrevious = transformedData.slice(-1);
    
                // console.log("the previous object",copyOfPrevious, "\n", "the current object", item);
    
                if (copyOfPrevious[0]?.date !== item[2]) {
                    // Extract approval, disapproval, date from current item, map them to empty object. 
                    // Then add keys that generate the average approval/disapproval, by calculating sum of Array / length of Array
                    
                    let dataPoint = {
                        date: undefined,
                        approvalArray: [],
                        disapprovalArray: [],
                        averagedApproval: undefined,
                        averagedDisapproval: undefined
                    };
        
                    dataPoint.date = item[2];
                    dataPoint.approvalArray.push(parseFloat(item[3]));
                    dataPoint.disapprovalArray.push(parseFloat(item[6]));
                    dataPoint.averagedApproval = getAverageRating(dataPoint.approvalArray);
                    dataPoint.averagedDisapproval = getAverageRating(dataPoint.disapprovalArray);
    
                    transformedData.push(dataPoint);
                } else {
                    // If the most recent object that was pushed shares the same date with current item, push approval and disapproval
                    // to approval and disapproval Arrays of most recent object
                    transformedData[transformedData.length - 1].approvalArray.push(parseFloat(item[3]));
                    transformedData[transformedData.length - 1].disapprovalArray.push(parseFloat(item[6]));
                    transformedData[transformedData.length - 1].averagedApproval = getAverageRating(transformedData[transformedData.length - 1].approvalArray);
                    transformedData[transformedData.length - 1].averagedDisapproval = getAverageRating(transformedData[transformedData.length - 1].disapprovalArray);
                }
    
            })
    
            transformedData.forEach( (item, index) => {
                console.log(item.averagedApproval);
                if(index !== 0) {
                    item.approvalChange = parseFloat((item.averagedApproval - transformedData[index - 1].averagedApproval).toFixed(2));
                    item.disapprovalChange = parseFloat((item.averagedDisapproval - transformedData[index - 1].averagedDisapproval).toFixed(2));
                }
                return;
            })
    
            // console.log(transformedData);
            // return transformedData;



        }
    })
    console.log(transformedData);
    return transformedData;
}



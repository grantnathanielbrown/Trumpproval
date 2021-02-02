// const http = require('http');
const fs = require("fs");
const papa = require("papaparse");

function getAverageRating(arr) {
    let rating =  arr.reduce((accumulator, currentValue) => accumulator + currentValue) / arr.length;
    return parseFloat(rating.toFixed(2));
}


    
    const stream = fs.createReadStream("/Users/grant/Desktop/Trumpproval/src/convert/data/approval_topline.csv");
function convert(results) {
    
    let reversedData = results.data.reverse();
    reversedData.pop();
    
    // console.log("Parsing complete:", reversedData);
    let transformedData = [];

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
        if(index !== 0) {
            item.approvalChange = parseFloat((item.averagedApproval - transformedData[index - 1].averagedApproval).toFixed(2));
            item.disapprovalChange = parseFloat((item.averagedDisapproval - transformedData[index - 1].averagedDisapproval).toFixed(2));
        }
    })
    console.log(transformedData.slice(0,20));
    fs.writeFile("/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/approval.json", JSON.stringify(transformedData), function (err) {
        if (err) return console.log(err);
        console.log('The data was written');
        });
    console.log("this should not come before");
    // return transformedData;
}

    papa.parse(stream, {
    
        complete: (results) => convert(results)

    })


    

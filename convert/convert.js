const fs = require("fs");
const papa = require("papaparse");

const file = fs.createReadStream("/Users/grant/Desktop/TrumParrot/convert/data/trump_sample.csv")

function getAverageRating(arr) {
    let rating =  arr.reduce((accumulator, currentValue) => accumulator + currentValue) / arr.length;
    return parseFloat(rating.toFixed(2));
}

papa.parse(file, {
    // transform: (value,field) => {
    //     let transformedData;
    //     console.log(value, "\n", field);
        
    // },
    complete: (results, file) => {

        
        let parsedData = results.data;
        console.log("Parsing complete:", parsedData);
        let transformedData = [];
        parsedData.forEach( (item) => {
            

            let copyOfPrevious = transformedData.slice(-1);

            console.log("the previous object",copyOfPrevious, "\n", "the current object", item);

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

        console.log(transformedData);

    }
})




const fs = require("fs");
let approvalData = require("./transformed_data/approval.json");
let tweetData = require("./transformed_data/tweets.json");



tweetData.forEach( (tweet) => {
    let target = approvalData.findIndex( (approvalItem) => {
        return tweet.date === approvalItem.date;
    })
    approvalData[target].numberOfTweets = tweet.numberOfTweets;
})

console.log(approvalData.slice(0,20));

fs.writeFile("/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/combined.json", JSON.stringify(approvalData), function (err) {
    if (err) return console.log(err);
    console.log('The data was written');
    });
console.log("this should not come before");


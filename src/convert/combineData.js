const fs = require("fs");
let approvalData = require("./transformed_data/approval.json");
let tweetData = require("./transformed_data/tweets.json");



tweetData.forEach( (tweet) => {
    let target = approvalData.findIndex( (approvalItem) => {
        return tweet.date === approvalItem.date;
    })
    approvalData[target].numberOfTweets = tweet.numberOfTweets;
})

approvalData.forEach( (item) => {
    if (item.numberOfTweets === undefined) {
        item.numberOfTweets = 0;    
    }
})


fs.writeFile("/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/combined.json", JSON.stringify(approvalData), function (err) {
    if (err) return console.log(err);
    console.log('The data was written');
    });



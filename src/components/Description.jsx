import React, { Component } from 'react'

export default class Description extends Component {
    render() {
        return (
            <div className="flex-wrapper">
                <span className="header">
                    Trumpproval
                </span>
                <p className="description">
                I modified and combined other data sets to create a data set containing Donald Trump's daily shift in approval rating (according to 538), his overall approval rating as an average of different polls, and the number of tweets for each calendar day between January 2017 to January 2021. I want to see if there was a correlation between his shifts in approval rating and the number of times that he tweeted.
                </p>
            </div>
        )
    }
}

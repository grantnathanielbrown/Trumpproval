import React, { Component } from 'react'

export default class Description extends Component {
    render() {
        return (
            <div className="flex-wrapper">
                <span className="header">
                    Trumpproval
                </span>
                <p className="description">
                I modified and combined other data sets to create a data set containing Donald Trump's daily shift in approval rating (according to 538), his overall approval rating as an average of different polls, and the number of tweets for each calendar day between January 2017 to January 2021. I had a theory that a greater shift in approval rating would result in a higher number of tweets. To my surprise, there seems to be no correlation at all between the two, as the Pearson correlation coefficient between the two data sets is <span className="correlation">-0.03</span> (a PCC of 0 meaning there is no correlation whatsoever).
                </p>
            </div>
        )
    }
}

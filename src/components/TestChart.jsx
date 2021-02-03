import React, { Component } from 'react';
import {
  ComposedChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Line
} from 'recharts';
// import combinedData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/combined.json'; 
import combinedData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/sample.json'; 
export default class TestChart extends Component {

  render() {

    return (
      <ComposedChart
        width={1000}
        height={500}
        data={combinedData.slice(0,5)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="approvalChange">
        {
      combinedData.map((entry, index) => (
        <Cell key={index} fill={entry.approvalChange >= 0 ? "#66ff00" : "#FF0000"} />
      ))
    }
        </Bar>
        <Line type="monotone" dataKey="averagedApproval" stroke="#ffa500" />
        <Line type="monotone" dataKey="numberOfTweets" stroke="	#FFC0CB" />
      </ComposedChart>
    );
  }
}


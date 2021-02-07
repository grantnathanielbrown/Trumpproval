import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ComposedChart, Brush, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Line
} from 'recharts';
import combinedData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/combined.json'; 
// import combinedData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/sample.json';
const slicedData = combinedData;
console.log(slicedData); 
export default class TestChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvalChange: true,
      numberOfTweets: true,
      averagedApproval: false,
    }
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(dataset) {
    this.setState({[dataset]: !this.state[dataset]})
  }

  render() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    return (
      
      <div>
        <ComposedChart
        width={width * 0.8}
        height={height * 0.5}
        data={slicedData}
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
          <Brush dataKey='date' x={width * 0.1} width={width * 0.6} endIndex={365} height={50} stroke="#000000"/>
          <Bar dataKey={this.state.approvalChange === true ? "approvalChange" : "approvalChange "}>
          {
            combinedData.map((entry, index) => (
              <Cell key={index} fill={entry.approvalChange >= 0 ? "#66ff00" : "#FF0000"} />
            ))
          }

          </Bar>
          <Line type="monotone" dataKey={this.state.numberOfTweets === true ? "numberOfTweets" : "numberOfTweets "} stroke="#FFC0CB" />
          <Line type="monotone" dataKey={this.state.averagedApproval === true ? "averagedApproval" : "averagedApproval "} stroke="#FFA500" />
        </ComposedChart>

        <div>
          <Checkbox defaultChecked onChange={() => this.toggleVisibility("approvalChange")}color="primary"/>Show <span id="approval-change-span">Approval Change Bar</span>
          <Checkbox defaultChecked onChange={() => this.toggleVisibility("numberOfTweets")}color="primary"/>Show <span id="number-of-tweets-span">Number Of Tweets Line</span>
          <Checkbox onChange={() => this.toggleVisibility("averagedApproval")}color="primary"/>Show <span id="averaged-approval-span">Overall Approval Line</span>
        </div>
      </div>
    );
  }
}

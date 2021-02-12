import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ComposedChart, Brush, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Line
} from 'recharts';
import combinedData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/combined.json'; 
import absData from '/Users/grant/Desktop/Trumpproval/src/convert/transformed_data/absCombined.json'; 
import Statistics from 'statistics.js'; 


export default class TestChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApprovalChange: true,
      showNumberOfTweets: true,
      showAveragedApproval: false,
      brushStatistics: {
        brushStartDate: "Jan. 23, 2017",
        brushEndDate: "May. 3, 2017",
        totalTweets: 516,
        averageTweets: 5.11,
        averageApprovalChange: -0.03, 
        totalApprovalChange: -2.75,
        PCC: 0.18
      }
    }
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.updateStatistics = this.updateStatistics.bind(this);
  }

  toggleVisibility(dataset) {
    this.setState({[dataset]: !this.state[dataset]})
  }

  updateStatistics(e) {
    let combinedBrush = combinedData.slice(e.startIndex,e.endIndex + 1);
    let absBrush = absData.slice(e.startIndex,e.endIndex + 1);
    console.log(combinedBrush);

    let brushStartDate = combinedBrush[0].date;
    let brushEndDate = combinedBrush[combinedBrush.length - 1].date;

    let dailyTweetArray = combinedBrush.map( (item) => {
      return item.numberOfTweets;
    });

    let totalTweets = dailyTweetArray.reduce((accumulator, currentValue) => accumulator + currentValue);

    let averageTweets = parseFloat((totalTweets / dailyTweetArray.length).toFixed(2));

    let dailyApprovalChangeArray = combinedBrush.map( (item) => {
      return item.approvalChange;
    })

    let totalApprovalChange = parseFloat(dailyApprovalChangeArray.reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2));
        
    let averageApprovalChange = parseFloat((totalApprovalChange / dailyApprovalChangeArray.length).toFixed(2));

    let statsColumns = {
      approvalChange: "metric",
      numberOfTweets: "metric"
    }

    let stats = new Statistics(absBrush, statsColumns);
    
    let PCC = parseFloat((stats.correlationCoefficient("approvalChange","numberOfTweets").correlationCoefficient).toFixed(2));

    this.setState({
      brushStatistics: {
        brushStartDate,
        brushEndDate,
        totalTweets,
        averageTweets,
        averageApprovalChange,
        totalApprovalChange,
        PCC
      }
    })
  }

  render() {

    let width = window.innerWidth;
    let height = window.innerHeight;
    return (
      
      <div>
        <ComposedChart
        width={width * 0.8}
        height={height * 0.5}
        data={combinedData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey='date' onChange={(e) => {this.updateStatistics(e)}} x={width * 0.1} width={width * 0.6} endIndex={100} height={50} stroke="#000000"/>
          <Bar dataKey={this.state.showApprovalChange === true ? "approvalChange" : "approvalChange "}>
          {
            combinedData.map((entry, index) => (
              <Cell key={index} fill={entry.approvalChange >= 0 ? "#66ff00" : "#FF0000"} />
            ))
          }

          </Bar>
          <Line type="monotone" dataKey={this.state.showNumberOfTweets === true ? "numberOfTweets" : "numberOfTweets "} stroke="#FFC0CB" />
          <Line type="monotone" dataKey={this.state.showAveragedApproval === true ? "averagedApproval" : "averagedApproval "} stroke="#FFA500" />
        </ComposedChart>

        <div>
          <Checkbox defaultChecked onChange={() => this.toggleVisibility("showApprovalChange")}color="primary"/>Show <span id="approval-change-span">Approval Change Bar</span>
          <Checkbox defaultChecked onChange={() => this.toggleVisibility("showNumberOfTweets")}color="primary"/>Show <span id="number-of-tweets-span">Number Of Tweets Line</span>
          <Checkbox onChange={() => this.toggleVisibility("showAveragedApproval")}color="primary"/>Show <span id="averaged-approval-span">Overall Approval Line</span>
        </div>

        <h1>Between <span>{this.state.brushStatistics.brushStartDate}</span> and <span>{this.state.brushStatistics.brushEndDate}</span>, Donald Trump:  </h1>
    <p className="statistics">Averaged a total of <span>{this.state.brushStatistics.averageTweets}</span> tweets on a daily basis.</p>
    <p className="statistics">Tweeted a total of <span>{this.state.brushStatistics.totalTweets}</span> times.</p>
    {/* Averaged a daily approval shift of {this.state.brushStatistics.averageApprovalChange}. */}
    <p className="statistics">Experienced an overall shift of <span>{this.state.brushStatistics.totalApprovalChange}</span> in his approval rating.</p>
    <p className="statistics">Had a PCC of <span>{this.state.brushStatistics.PCC}</span> between his daily tweet count and approval rating shift.</p>

      </div>
    );
  }
}

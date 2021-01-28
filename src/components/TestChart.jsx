import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import moment from 'moment'; 
// sample
import data from '../convert/transformed_data/sample.json';
// full
// import data from '../convert/transformed_data/approval.json'; 

export default class TestChart extends Component {

  render() {

    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={timeStr => moment(timeStr).format('MMM. D, YYYY')}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="approvalChange">
        {
      data.map((entry, index) => (
        <Cell key={index} fill={entry.approvalChange >= 0 ? "#66ff00" : "#FF0000"} />
      ))
    }
        </Bar>
      </BarChart>
    );
  }
}


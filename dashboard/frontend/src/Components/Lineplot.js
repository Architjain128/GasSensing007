import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

const state = {
    labels: ["9-11", "10-11", "11-11",
             "12-11", "13-11"],
    datasets: [
      {
        label: 'Gas Readings',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

export default class Lineplot extends Component {
    render() {
    return (
        <div>
        <Line
            data={state}
            options={{
            title:{
                display:true,
                text:'Gas sensed',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            }
            }}
        />
        </div>
    );
    }
}
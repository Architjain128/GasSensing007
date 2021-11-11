import React, { Component } from "react";
import '../files/css/login.css'
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';


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

const columns = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'timestamp', headerName: 'Time Stamp', width: 130 },
  { field: 'reading', headerName: 'Reading', width: 130 },
  ];

var rows = []

export default class SubHome extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount(){
        const getCookie=(cname) =>{
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        let coo = getCookie("gas-user-session");
        if(coo == ""){
            alert("Please login first!");
            window.location.href = "/";
        }
        else{
            async function aaa(){
                await axios.get("https://cors-anywhere.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
                    headers : {
                            "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                        }
                })
                .then(function (res) {
                    console.log(res.data);
                    var json_data = [] , rows = [], temp_data = []
                    temp_data = res.data['m2m:cnt']['m2m:cin']
                    for(var i=0;i<temp_data.length;i++)
                    {
                        json_data.push(temp_data[i]['con'])
                    }
                    for(var i=0;i<100 && i<json_data.length;i++)
                    {
                        var time="",reading=""
                        var f = 0
                        for(var j=1;j<json_data[i].length-1;j++)
                        {
                            if(json_data[i][j]==',')
                            {
                                f=1
                                continue
                            }
                            if(f==0)
                            {
                                time += json_data[i][j]
                            }
                            else
                            {
                                reading += json_data[i][j]
                            }
                        }
                        rows.push({ id: i+1, index: i+1, timestamp: time, reading: reading })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            aaa();
        }
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div style={{height:"400px"}}>
                            <h2>Graph Plotting:</h2>
                            <div style={{height:"100px", width:"500px"}}>
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
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{height:"400px"}}>
                            <h2>Below are the latest 10 readings:</h2>
                            <DataGrid rows={rows} columns={columns}/>
                        </div>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}
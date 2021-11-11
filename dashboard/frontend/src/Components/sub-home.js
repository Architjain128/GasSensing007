import React, { Component } from "react";
import '../files/css/login.css'
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
const xml2js = require('xml2js');

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



  var max_readings = 10
 
  // convert XML to JSON
function xmlToJson(xml,dec) {
    let rows =[ ]
    xml2js.parseString(xml, (err, result) => {
        if(err) {
            throw err;
        }

    const json = JSON.stringify(result, null, 4);
    const obj = JSON.parse(json);

    var json_data = [] , temp_data = []
    temp_data = obj['m2m:cnt']['m2m:cin']
    for(var i=0;i<temp_data.length;i++)
    {
        json_data.push(temp_data[i]['con'])
    }
    var c = 0
    for(var i=0;i<json_data.length && c<max_readings;i++)
    {
        var str = json_data[i][0]
        var f = 0
        for(var j=0;j<str.length;j++)
        {
            if(str[j]==',')
            {
                f=1
                break
            }
        }
        if(f==1)
        {
            c+=1
            f = 0
            var time="",reading=""
            for(var j=1;j<str.length-1;j++)
            {
                if(str[j]==',')
                {
                    f=1
                    continue
                }
                if(f==0)
                {
                    time += str[j]
                }
                else
                {
                    reading += str[j]
                }
            }
            rows.push({ id: c, index: c, timestamp: time, reading: dec(reading) })
        }
    }    
    });
    return rows
}



export default class SubHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: "",
            rows: [],
            columns: columns,
        }
        this.decryption = this.decryption.bind(this)
    }
    async componentDidMount(){
        async function aaa(){
            await axios.get("https://cors-anywhere.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
                headers : {
                        "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                    }
            })
            .then(function (res) {
                console.log(res.data);
                this.parseString(res.data,this.decryption)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const refreshy=()=> {
            this.setState({last: new Date().toLocaleTimeString()})
            aaa()
            setTimeout(refreshy, 60*1000);
        }
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
            this.setState({last: new Date().toLocaleTimeString()})
            aaa();
            setTimeout(refreshy, 60*1000);
        }
    }
    decryption(value){
        var true_reading = "";
        var len1 = value.length;
        for(let i=0;i<len1;i+=41)
        {
            true_reading +=value[i];
        }
        return true_reading
    }
    parseString(value){
        this.setState({rows:xmlToJson(value)})
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
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <h3>All readings will be updated in 60 sec, last updated at {this.state.last}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{height:"400px"}}>
                            <h2>Below are the latest 10 readings:</h2>
                            <DataGrid rows={this.state.rows} columns={this.state.columns}/>
                        </div>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}
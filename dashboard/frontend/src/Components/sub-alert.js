import React, { Component } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import '../files/css/login.css'
import axios from 'axios';

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

export default class SubAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last:""
        }
    }
    
    // initial call, or just call refresh directly
    componentDidMount(){
        async function aaa(){
            await axios.get("https://cors-anywhere.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
                headers : {
                        "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                        // "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
        
            })
            .then(function (res) {
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
        const refreshy=()=> {
            this.setState({last:new Date().toLocaleTimeString()})
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
            this.setState({last:new Date().toLocaleTimeString()})
            aaa();
            setTimeout(refreshy, 60*1000);
        }
    }
    
    render() {
        return (
            <div>
            
            <div style={{height:"400px"}}>
            <h2>Below are the past alert values:</h2>
            <h3>All readings will be updated in 60 sec, last updated at {this.state.last}</h3>

                <DataGrid rows={rows} columns={columns}/>
            </div>
        </div>
        );
    }
} 
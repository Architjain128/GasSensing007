import React, { Component } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import '../files/css/login.css'
import Axios from 'axios';

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

export default class SubData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: "",
        }
        this.aaa=this.aaa.bind(this)
    }
    componentDidMount(){
        const refreshy=()=> {
            this.setState({last: new Date().toLocaleTimeString()})
            this.aaa();
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
            this.aaa();
            setTimeout(refreshy, 60*1000);
        }
    }
    async aaa(){
        let res= await Axios({
                method: 'get',
                url: "https://cors-anywhere.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",
                headers: {
                    "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                }
            });
            console.log(res.data)
    }

    render() {
        return (
        <div>
            <br/>
            <br/>
            <br/>
            <div style={{height:"800px"}}>
            <h2>Below are the latest 100 readings:</h2>
            <h3>All readings will be updated in 60 sec, last updated at {this.state.last}</h3>

                <DataGrid rows={rows} columns={columns}/>
            </div>
        </div>
        );
    }
}
import React, { Component } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import '../files/css/login.css'
import axios from 'axios';
import {TableBody, TableCell, TableHead, TableRow, Table,Paper,TableContainer} from '@material-ui/core';
import { Grid } from "@material-ui/core";


const columns = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'timestamp', headerName: 'Time Stamp', width: 130 },
  { field: 'reading', headerName: 'Reading', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  ];

  const xml2js = require('xml2js');
  const rows = []

export default class SubAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: "",
            rows: [],
            load: true,
        }
        this.decryption = this.decryption.bind(this)
    }
    async componentDidMount(){
        let roww = []
        async function aaa(){
            await axios.get("https://middlecors.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
                headers : {
                        "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                    }
            })
            .then(function (res) {
                // console.log(res.data);
                let rows = []
                xml2js.parseString(res.data, (err, result) => {
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
                    for(var i=0;i<json_data.length;i++)
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
                            if(str[1]==="6"){
                                for(var j=5;j<str.length-1;j++)
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
                                let value=reading
                                var true_reading = "";
                                var len1 = value.length;
                                for(let i=1;i<len1;i+=41)
                                {
                                    true_reading +=value[i];
                                }
                                true_reading = parseInt(true_reading)
                                if(true_reading>3000)
                                rows.push({ id: c, index: c, timestamp: time, reading: true_reading, status: "☠️"})
                            }
                        }
                    }
                });
                
                roww = rows.reverse()
                return rows
            })
            .catch(function (error) {
                console.log(error);
                return -1
            });
        }
        const refreshy=()=> {
            this.setState({load:true,last: new Date().toLocaleTimeString()})
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
            let vv = await aaa();
            if(vv==-1){
                alert("Please login first!");
            }
            else{
                console.log(roww)
                // row=roww
                this.setState({rows: roww})
                this.setState({load:false})
            }
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
    render() {
        return (
        <div>
                <h1>Alert Page</h1>

            <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={10}>
                    <h2>Below are the all the Alert ☠️ readings (Last updated at: {this.state.last})</h2>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={6}>
                    <div style={{width:"800px"}}>
                        {
                            this.state.load==true?<h3>Loading...</h3>:
                            <>
                            {this.state.rows.length==0?<h3>Yay, No Alerts moments encountered</h3>:
                            <TableContainer component={Paper}>
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Timestamp</TableCell>
                                            <TableCell align="center">Reading</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left">{row.timestamp}</TableCell>
                                                <TableCell align="center">{row.reading}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            }
                            </>
                        }
                    </div>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>


            </div>
        );
    }
}
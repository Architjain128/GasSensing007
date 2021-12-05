import React, { Component } from "react";
import '../files/css/login.css'
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {TableBody, TableCell, TableHead, TableRow, Table,Paper,TableContainer} from '@material-ui/core';
const xml2js = require('xml2js');



let row=[]
var hash_key = ''

const columns = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'timestamp', headerName: 'Time Stamp', width: 130 },
  { field: 'reading', headerName: 'Reading', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  ];



var max_readings = 10

  // convert XML to JSON

  let rrows = []
  let sstate ={}

export default class SubHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: "",
            columns: columns,
            rows: [],
            load:true,
        }
        this.decryption = this.decryption.bind(this)
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

    async componentDidMount(){
        // take key from local storage
        hash_key = localStorage.getItem('gas-encrypt-key')

        let roww = []
        let statee = []
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
                            if(str[1]==="8"){
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
                                // removing whitespaces from front and back
                                value = value.trim()

                                // decryption
                                var aesEcb = require('aes-ecb');
                                var encrypt = Buffer.from(value, 'hex').toString('base64')
                                var decrypt = aesEcb.decrypt(hash_key, encrypt);
                                
                                var true_reading = ''
                                for(let i=0;i<7;i++)
                                {
                                    true_reading+=decrypt[i]
                                }

                                console.log("got: ",time,value)
                                console.log("parsed ",time,true_reading)
                                if(true_reading>'3000')
                                rows.push({ id: c, index: c, timestamp: time, reading: true_reading, status: "☠️"})
                                else 
                                rows.push({ id: c, index: c, timestamp: time, reading: true_reading, status: "✔️"})
                            }
                        }
                    }
                });
                // console.log(rows)
                let tt=[]
                let lb=[]
                let val=[]
                for(var i=0;i<10;i++)
                {
                    if(rows.length-i-1>=0){
                        rows[i].index=i
                        rows[i].id=i
                        lb.push(rows[rows.length-i-1].timestamp)
                        val.push(parseFloat(rows[rows.length-i-1].reading))
                        tt.push(rows[rows.length-i-1])

                    }
                }
                statee = {
                    labels: lb.reverse(),
                    datasets: [
                      {
                        label: 'Gas Readings',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: val.reverse()
                      }
                    ]
                  }
                roww = tt
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
            setTimeout(refreshy, 30*1000);
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
                row=roww
                sstate=statee
                this.setState({rows: roww})
                this.setState({load:false})
            }
            setTimeout(refreshy, 30*1000);
        }
    }

    render() {
        
        return (
            <div>
                <h1>Home Page</h1>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div style={{height:"400px"}}>
                            <h2>Graph Plotting:</h2>
                            <div style={{height:"100px", width:"500px"}}>
                                <Line
                                    data={sstate}
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
                            <h3>All readings will be updated in 30 sec, last updated at {this.state.last}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{height:"400px"}}>
                            <h2>Below are the latest 10 readings:</h2>
                            {
                                this.state.load==true?<h3>Loading...</h3>:
                                <>
                                <TableContainer component={Paper}>
                                    <Table  aria-label="simple table">
                                        <TableHead style={{backgroundColor: '#56a1db'}}>
                                            <TableRow>
                                                <TableCell align="left">Timestamp</TableCell>
                                                <TableCell align="center">Reading</TableCell>
                                                <TableCell align="right">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell align="left">{row.timestamp}</TableCell>
                                                    <TableCell align="center">{row.reading}</TableCell>
                                                    <TableCell align="right">{row.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
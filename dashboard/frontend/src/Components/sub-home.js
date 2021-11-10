import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/login.css'
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";

const getTotal = (params) => params.getValue(params.id, 'maths')  + params.getValue(params.id, 'science')
const columns = [
  { field: 'maths', headerName: 'Maths', width: 130 },
  { field: 'science', headerName: 'Science', width: 130 },
  {
  field: 'Total',
  headerName: 'Total marks',
  width: 160,
  valueGetter: getTotal,
  },
  ];
  const rows = [
  { id: 1, maths: 75, science: 60 },
  { id: 2, maths: 80, science: 70 },
  { id: 3, maths: 50, science: 80 },
  { id: 4, maths: 80, science: 60 },
  { id: 5, maths: 100, science: 90 },
  ];
export default class SubHome extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                Home Page
                <div style={{height:"400px"}}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </div>
        );
    }
}
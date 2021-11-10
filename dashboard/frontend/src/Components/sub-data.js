import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/login.css'


export default class SubData extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                Data Page
            </div>
        );
    }
}
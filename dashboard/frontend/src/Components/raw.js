import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';

export default class Raw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raw: localStorage.getItem('gas-data-raw')
        }
    }
    render() {
        return (
            <div>
                <br/>
                <Button fullWidth p="5" variant="contained" color="primary" onClick={() => {localStorage.removeItem("gas-data-raw");window.location.href = '/data'}}>Back to Data page</Button>
                <br/>
                <br/>
                <hr/>
                <div>
                </div>
                <pre>
                {JSON.stringify(JSON.parse(this.state.raw), null, 2) }
                </pre>
            
            </div>
        );
    }
}
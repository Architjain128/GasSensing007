import React, { Component } from 'react'
import { NavLink} from 'react-router-dom';
import {Grid,Paper,Container,Box,Button,Divider,Typography} from '@material-ui/core';

class LandingPage extends Component {
    constructor(props){
        super(props)
        this.state = {CompanyName:"/pimg/meme.jpg"}
    }
    render() {
        return (
            <Container>
                <Box 
                bgcolor="white"
                boxShadow="10"
                borderColor="black"
                borderRadius="15px"
                textAlign="center"
                p='30px'
                mt='40px'
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4"><b>Welcome to Olfactory Sensing App</b></Typography>
                        <img src="https://raw.githubusercontent.com/Architjain128/JODAR-jobRadar/master/public/pimg/meme.jpg" alt="website company name" style={{width:"90%",padding:"15px",margin:"auto"}}></img>
                        <br/>
                        <br/>
                        <Divider variant="middle"></Divider>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper >
                                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    id="landloginbutton"
                                    onClick 
                                    >
                                    Login
                                    </Button>
                                </NavLink>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper >
                                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    id="landloginbutton"
                                    >
                                    Sign Up
                                    </Button>
                                </NavLink>
                            </Paper>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Container>
        )
    }
}

export default LandingPage
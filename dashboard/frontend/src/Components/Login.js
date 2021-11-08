import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // this fxn updates with each letter written under password section
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  // this fxn updates with each letter written under email section
  onChangeUserName(event) {
    this.setState({ username: event.target.value });
  }

  // this fxn will be called when user clicks the submit btn on login page
  onSubmit(e) {

      e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }

        const loginhere = async () => {
            try {
                    const res = await axios.post('http://localhost:6050/user/login', newUser);
                    if(res.status === 200)
                    {
                        //entering the id in database
                        const id = {
                            identity: res.data._id
                        }
                        try {
                            // await axios.post('http://localhost:4000/ids',id)
                            // alert("Logged In as " + res.data.name)
                            window.location.href="http://localhost:3000/dashboard"
                        }
                        catch (err) {
                            // alert(err)
                        }
                    }
                    if(res.status === 204)
                    {
                        alert("Invalid Email!");
                    }
                    if(res.status === 205)
                    {
                        alert("Email not found!");
                    }
                    if(res.status === 206)
                    {
                        alert("Incorrect Password");
                    }
                } 
            catch (err) {
                //  alert(err);
                }    
        };

        loginhere();
  }

  render() {
    return (
      <Container>
        <Box 
        bgcolor="white"
        boxShadow="10"
        borderColor="purple"
        borderRadius="15px"
        textAlign="center"
        p='30px'
        mt='50px'
        >
        <div>
          <AccountCircle id="loginicon" />
          <div id="logincontainer">
              <Typography component="div" id="logintypo" >
              <form onSubmit={this.onSubmit}>
                  <br/>
                  <br/>
                  <h1>Sign In</h1>
                      <TextField
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      name="username"
                      label="UserName"
                      type="text"
                      id="username"
                      onChange = {this.onChangeUserName}
                      />

                      <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          onChange = {this.onChangePassword}
                      />
                      <br/>
                      <br/>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          id="loginbutton"
                          onClick = {this.onSubmit}
                          >
                          Sign In
                      </Button>
                      <br/>
                      <br/>
                  </form> 
                  <p id="nouser">Not registered yet? <a id="tandc" href="http://localhost:3000/register">Sign Up</a></p>
                  </Typography>
                </div>
              </div>
        </Box>
      </Container>
    );
  }
}

import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle, FlipToBack} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserName: "",
      Password: "",
      NodeId: ""
    };

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNodeId = this.onChangeNodeId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // this fxn updates with each letter written under password section
  onChangePassword(event) {
    this.setState({ Password: event.target.value });
  }

  // this fxn updates with each letter written under email section
  onChangeUserName(event) {
    this.setState({ UserName: event.target.value });
  }

  onChangeNodeId(event) {
    this.setState({ NodeId: event.target.value });
  }

  // this fxn will be called when user clicks the submit btn on login page
  onSubmit(e) {

      e.preventDefault();

        const newUser = {
            UserName: this.state.UserName,
            Password: this.state.Password,
            NodeId: this.state.NodeId
        }
        const setCookie=(cname, cvalue, exmin)=> {
          const d = new Date();
          d.setTime(d.getTime() + (exmin*60*1000));
          let expires = "expires="+ d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        const loginhere = async () => {
            try {
                    const res = await axios.post('http://localhost:6050/user/login', newUser);
                    console.log(res.data);
                    
                    if(res.status == 200)
                    {
                      console.log("Login Successful");
                      let token = res.data.token;
                      setCookie("gas-user-session", token, 10);
                      localStorage.setItem("gas-nodeid", this.state.NodeId);
                      localStorage.setItem("gas-encrypt-key", res.data.key);
                      window.location.href="http://localhost:3000/home"
                    }
                    else
                    {
                      alert("Invalid data entered")
                    }
                } 
            catch (err) {
                alert("Oops!, can't login now");
            }
        };

        if (this.state.UserName == "" || this.state.Password == "" || this.state.NodeId == "")
        {
              alert("Enter vaild values.")
        }
        else
        {
          loginhere();
        }
  }

  render() {
    return (
      <Container>
        <Box 
        bgcolor="white"
        boxShadow="10"
        borderColor="blue"
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
                      name="UserName"
                      label="UserName"
                      type="text"
                      id="UserName"
                      onChange = {this.onChangeUserName}
                      />

                      <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          name="Password"
                          label="Password"
                          type="password"
                          id="Password"
                          onChange = {this.onChangePassword}
                      />

                      <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          name="NodeId"
                          label="Node Id"
                          type="text"
                          id="NodeId"
                          onChange = {this.onChangeNodeId}
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

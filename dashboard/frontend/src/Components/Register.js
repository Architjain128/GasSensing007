import React, { Component } from "react";
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/signup.css'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserName: "",
      Email: "",
      MobileNumber: "",
      Password: "",
      NodeId: ""
    };

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNodeId = this.onChangeNodeId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:4000/user/legit", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data, "this is the response");
  //       if (!res.data) {
  //         // window.location = '/register';
  //       } else {
  //         window.location = "/";
  //         console.log(document.cookie + "this cookie");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log(Date());
  // }

   
  onChangeUserName(event) {
    this.setState({ username: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangeMobileNumber(event) {
    this.setState({ mobilenumber: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeNodeId(event) {
    this.setState({ nodeid: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

        var ind = document.getElementById("role");
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            mobilenumber: this.state.mobilenumber,
            password: this.state.password,
            nodeid: this.state.nodeid
        }

        const registerhere = async () => {
            try {
                    // alert(newUser.username)
                    // alert(newUser.email)
                    // alert(newUser.mobilenumber)
                    // alert(newUser.password)
                    // alert(newUser.nodeid)
                    const res = await axios.post('http://localhost:6050/user/signup', newUser);
                    if(res.status === 200)
                    {
                        alert("Created user " + res.data.UserName + "\nRedirecting to Login page :-)")
                        window.location.href='http://localhost:3000/login'
                    }
                    if(res.status === 205)
                    {
                        alert("Ensure that email id is valid\nName,Email and Password must be atleast 4 characters long");
                    }
                    if(res.status === 204)
                    {
                        alert("Email already exists!");
                    }
                } 
            catch (err) {
                 alert(err);
            }    
        };
        registerhere();
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
                  <h1>Sign Up</h1>
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
                      name="email"
                      label="Email"
                      type="text"
                      id="email"
                      onChange = {this.onChangeEmail}
                      />

                      <TextField
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      name="mobilenumber"
                      label="Mobile No."
                      type="text"
                      id="mobilenumber"
                      onChange = {this.onChangeMobileNumber}
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

                        <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          name="nodeid"
                          label="Node Id"
                          type="password"
                          id="nodeid"
                          onChange = {this.onChangeNodeId}
                      />

                      <br/>
                      <br/>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          id="signupbutton"
                          onClick = {this.onSubmit}
                          >
                          Sign Up
                      </Button>
                      <br/>
                      <br/>
                  </form> 
                  <p id="nouser">Already registered? <a id="tandc" href="http://localhost:3000/login">Sign In</a></p>
                  </Typography>
                </div>
            </div>
          </Box>
      </Container>
    );
  }
}
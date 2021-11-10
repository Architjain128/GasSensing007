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
    this.setState({ UserName: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ Email: event.target.value });
  }

  onChangeMobileNumber(event) {
    this.setState({ MobileNumber: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ Password: event.target.value });
  }

  onChangeNodeId(event) {
    this.setState({ NodeId: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

        var ind = document.getElementById("role");
        const newUser = {
            UserName: this.state.UserName,
            Email: this.state.Email,
            MobileNumber: this.state.MobileNumber,
            Password: this.state.Password,
            NodeId: this.state.NodeId
        }

        const registerhere = async () => {
            try {
                    const res = await axios.post('http://localhost:6050/user/signup', newUser);
                    if(res.status === 200)
                    {
                        // alert("Created user " + res.data.UserName + "\nRedirecting to Login page :-)")
                        alert(res.data.UserName)
                        window.location.href='http://localhost:3000/login'
                    }
                    else
                    {
                        alert("Err");
                    }
                } 
            catch (err) {
                 alert(err);
            }    
        };
        if (this.state.UserName == "" || this.state.Password == "" || this.state.NodeId == "" || this.state.Email == "" || this.state.MobileNumber == "")
        {
              alert("NULL values are not supported")
        }
        else
        {
          registerhere();
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
                  <h1>Sign Up</h1>
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
                      name="Email"
                      label="Email"
                      type="text"
                      id="Email"
                      onChange = {this.onChangeEmail}
                      />

                      <TextField
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      name="MobileNumber"
                      label="Mobile No."
                      type="text"
                      id="MobileNumber"
                      onChange = {this.onChangeMobileNumber}
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
                          type="password"
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
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNavigate } from "react-router-dom";

const Login = ({ handleChange }) => {
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [value, setValue] = useState("2");

  const handleSignupLinkClick = () => {
    handleChange(null, "1"); 
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    // Construct the data object
    const data = {
        email,
        password
    };

    try{
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/login/",
            data
          );
          console.log(response.data);
          const token = response.data.token;
          localStorage.setItem("token", token)
          
          if (response.data.msg === "Login Successful" && token !== "") {
            navigate("/dashboard/");
          }
    }
    catch(error){
        console.log(error)
    }
  }

  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>

        <form onSubmit={handleSubmit} method="POST">
          <TextField
            label="Email"
            placeholder="Enter for email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
         
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>

       
        <Typography>
          Do you have an account ?
          <Link href="#" onClick={handleSignupLinkClick}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;

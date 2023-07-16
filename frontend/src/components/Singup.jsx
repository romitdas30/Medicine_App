import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleChange }) => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const handleLoginLinkClick = () => {
    handleChange(null, "2");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const data = {
      name,
      email,
      mobile_number,
      password,
      password2,
    };

    try {
      // Send data to the API
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/registration/",
        data
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setMobile_number("");
      setPassword("");
      setPassword2("");
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("token: " + token);

      if (response.data.msg === "Registration Successful" && token !== "") {
        navigate("/dashboard/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit} method="POST">
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            value={mobile_number}
            onChange={(e) => setMobile_number(e.target.value)}
          />

          <TextField
            type="password"
            fullWidth
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            value={password2}
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
          <Typography style={{marginTop:'25px'}}>
            you already have an account ?
            <Link href="#" onClick={handleLoginLinkClick}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;

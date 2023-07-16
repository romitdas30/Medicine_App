import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  useTheme,
  Stack,
  Card,
  Button,
  CardActions,
  CardContent,
  Alert,
  AlertTitle,
  MenuItem
} from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const SelectAddress = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [state, setState] = useState("West Bengal");
  const [pin, setPin] = useState("");
  const [loading, setLoding] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { selectAddress } = useContext(CartContext);

  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleChangeCity = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = CityObj.find(
      (option) => option.value === selectedValue
    );
    setCity(selectedObject);
  };

  const handleChangeDistrict = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = DistObj.find(
      (option) => option.value === selectedValue
    );
    setDistrict(selectedObject);
  };

  const CityObj = [
    {
      value: "Jadavpur",
      label: "Jadavpur",
    },
    {
      value: "Dum Dum",
      label: "Dum Dum",
    },
    {
      value: "Bidhannagar",
      label: "Bidhannagar",
    },
    {
      value: "Park circus",
      label: "Park circus",
    },
    {
      value: "Kalyani",
      label: "Kalyani",
    },
  ];

  const DistObj = [
    {
      value: "Nadia",
      label: "Nadia",
    },
    {
      value: "North 24 parganas",
      label: "North 24 parganas",
    },
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/dashboard/addresses-book/",
          {
            headers,
          }
        );
        if (response) {
          console.log(response.data);
          setAddress(response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchAddress();
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const data = {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city.value,
      district: district.value,
      state: state,
      pin: pin,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dashboard/addresses-book/",
        data,
        { headers }
      );
      console.log(response.data);
      if (response.data) {
        setLoding(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelClick = (addressId) => {
    selectAddress(addressId);
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Container>
      {showAlert && (
        <Alert severity="success" onClose={handleAlertClose}>
          <AlertTitle>Success</AlertTitle>
          Address used successfully!
        </Alert>
      )}
      <Box>
        {/* Address book form */}
        <Container>
          <Typography
            variant="h1"
            component="h2"
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
            color={colors.grey[300]}
          >
            Address form
          </Typography>
          <form onSubmit={handleSubmit} method="POST">
            <Card sx={{ marginTop: 2, padding: "20px", width: "60%" }}>
              <Box>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    id="outlined-required"
                    fullWidth
                    label="Address Line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                  <TextField
                    id="outlined-required"
                    fullWidth
                    label="Address Line 2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    fullWidth
                    select
                    label="City"
                    value={city ? city.value : ""}
                    onChange={handleChangeCity}
                  >
                    {CityObj.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    select
                    label="District"
                    value={district ? district.value : ""}
                    onChange={handleChangeDistrict}
                  >
                    {DistObj.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-required"
                    value="West Bengal"
                    fullWidth
                    label="State"
                    disabled
                  />
                </Stack>

                <TextField
                  id="outlined-helperText"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  label="Pin"
                />
              </Box>

              <Button
                sx={{ marginTop: 3 }}
                size="medium"
                variant="contained"
                color="success"
                type="submit"
              >
                <Typography sx={{ color: "#ffff" }}>Add</Typography>
              </Button>
            </Card>
          </form>
        </Container>
        {/* Address card */}
        <Container sx={{ marginTop: 4 }}>
          <Typography
            variant="h1"
            component="h2"
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
            color={colors.grey[300]}
          >
            Your available address: choose one
          </Typography>
          <Box
            sx={{
              marginTop: 1,
              textAlign: "center",
              backgroundColor: "#ffff",
              width: "95%",
              padding: 5,
            }}
          >
            <Grid container spacing={2}>
              {address.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={4}>
                  <Card sx={{ height: "200px" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        {item.address_line_1}
                      </Typography>

                      <Typography variant="h5" component="div">
                        {item.address_line_2}
                      </Typography>

                      <Stack
                        spacing={2}
                        direction="row"
                        variant="body2"
                        justifyContent="center"
                        xs={{ marginTop: "7px" }}
                      >
                        <Typography color="text.secondary">
                          {item.city}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.district}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.state}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary">{item.pin}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handelClick(item.id)}
                        color="info"
                      >
                        <Typography color="white">Use this address</Typography>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Button
        sx={{ margin: 5 }}
        variant="contained"
        size="large"
        color="warning"
        onClick={() => navigate("/dashboard/orders")}
      >
        <Typography color="white" style={{ display: "flex" }}>
          Next <ArrowForwardIcon />
        </Typography>
      </Button>
    </Container>
  );
};

export default SelectAddress;

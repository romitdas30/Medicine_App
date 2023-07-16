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
  MenuItem
} from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const Payment = () => {

  const [cardnumber, setCardnumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [expireDateError, sxpireDateError] = useState("");
  const [ccv, setCcv] = useState("");
  const [ccvError, setCcvError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total_price = localStorage.getItem('total')
    const order_id = localStorage.getItem('order_id')

    // card_number validation
    if (cardnumber.length !==16) {
      sxpireDateError("Card number must be 16 characters long");
      return;
    } else {
      setCcvError("");
    }

    // CCV validation
    if (ccv.length !== 3) {
      setCcvError("CCV must be 3 characters long");
      return;
    } else {
      setCcvError("");
    }

    // Construct the data object
    const data = {
      "order_card_number": cardnumber,
      "expire_date": expireDate,
      "ccv": ccv,
      "total_price": total_price,
      "order_id":order_id
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dashboard/payment/",
        data,
        { headers }
      );
      console.log(response.data);
      if (response.data) {
        console.log(response.data)
        setCartItems([]);
        navigate("/dashboard/");

     }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Container>
        <Typography
          variant="h1"
          component="h2"
          fontWeight="bold"
          sx={{ m: "10px 0 0 0" }}
          color={colors.grey[300]}
        >
         Make Payment
        </Typography>
        <form onSubmit={handleSubmit} method="POST">
          <Card sx={{ marginTop: 2, padding: "20px", width: "60%" }}>
            <Box>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  id="outlined-required"
                  fullWidth
                  label="Card Number"
                  value={cardnumber}
                  onChange={(e) => setCardnumber(e.target.value)}
                  error={expireDateError !== ""}
                  helperText={expireDateError}
                />
              </Stack>

              
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                  id="outlined-required-2"
                  fullWidth
                  label="Expire date"
                  placeholder="MM/YYYY"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                />
                
                <TextField
                  fullWidth
                  label="CCV" 
                  type="password"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                  error={ccvError !== ""}
                  helperText={ccvError}
                />     
              </Stack>
            </Box>

            <Button
              sx={{ marginTop: 3 }}
              size="medium"
              variant="contained"
              color="error"
              type="submit"
            >
              <Typography sx={{ color: "#ffff" }}>Pay</Typography>
            </Button>
          </Card>
        </form>
      </Container>
    </Container>
  )
}

export default Payment
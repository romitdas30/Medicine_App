import { React, useContext, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Container,
  Button,
  Typography,
  useTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { cartItems, setCartItems, addressID } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    });

    let finalPrice = parseFloat(totalPrice).toFixed(2);
    return finalPrice;
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, []);

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      cart: cartItems,
      address_id: addressID,
      payment_mode: paymentMode,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dashboard/place_order/",
        orderData,
        { headers }
      );
      console.log(response.status);
      if (orderData.payment_mode === "Cash on Delivery") {
        if (response.status === 200) {
          setCartItems([]);
          handleAlert();
          setTimeout(() => {
            navigate("/dashboard/");
          }, "4000");
         
        }
      } else {
        console.log(orderData.payment_mode);
        const { order_id, total } = response.data;
        localStorage.setItem("order_id", order_id);
        localStorage.setItem("total", total);
        navigate("/dashboard/payment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: "4.5rem" }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Order Placed Sucessfully !
        </Alert>
      </Snackbar>

      <Typography
        variant="h3"
        component="h3"
        fontWeight="bold"
        sx={{ m: "10px 0 0 0" }}
        // color={colors.grey[300]}
      >
        Medicines:
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 3, marginBottom: 5 }}>
        <Table
          sx={{ minWidth: 650, borderRadius: "10px" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead sx={{ height: "3.5rem" }}>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Medicine name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Company
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Price
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Typography>{item.title}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{item.company}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{item.quantity}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{item.price}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h5"
        component="h5"
        fontWeight="bold"
        sx={{ m: "10px 0 0 0" }}
        // color={colors.grey[300]}
      >
        Total price: {totalPrice}
      </Typography>

      <Container sx={{ mt: 5, marginLeft: 0 }}>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Mode</FormLabel>
            <RadioGroup value={paymentMode} onChange={handlePaymentModeChange}>
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="Credit/Debit Cards"
                control={<Radio />}
                label="Credit/Debit Cards"
              />
              {/* <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              <FormControlLabel
                value="Net Banking"
                control={<Radio />}
                label="Net Banking"
              /> */}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Place Order & proceed to pay
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default Orders;

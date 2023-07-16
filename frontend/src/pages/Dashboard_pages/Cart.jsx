import { React, useContext, useState, useEffect } from "react";
import { tokens } from "../../theme";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const { cartItems, updateQuantity, deleteCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate()
  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    });

    let finalPrice = parseFloat(totalPrice).toFixed(2)
    return finalPrice;
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const handelClick = () =>{
    navigate("/dashboard/choose-address")
  }
  return (
    <Container sx={{ mt: "4.5rem" }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderRadius: "10px" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead sx={{ height: "3.5rem" }}>
            <TableRow>
              <TableCell align="center">
                <Typography>Medicine name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Company</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Price</Typography>
              </TableCell>
              <TableCell>
                <Typography>Quantity</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Action</Typography>
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
                  <Typography>{item.price}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Grid
                    container
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        fontSize: "15px",
                        padding: "0px",
                        maxWidth: "5px",
                      }}
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <TextField
                      sx={{
                        width: "60px",
                        height: "30px",
                        fontSize: "20px",
                      }}
                      type="number"
                      value={item.quantity}
                      InputProps={{ inputProps: { min: 1 } }}
                      variant="outlined"
                      size="small"
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        fontSize: "15px",
                        padding: "0px",
                        maxWidth: "5px",
                      }}
                      size="small"
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          parseInt(item.quantity) + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </Grid>
                </TableCell>

                <TableCell align="center">
                  <Button
                    startIcon={<DeleteIcon />}
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => deleteCartItem(item.id)}
                  >
                    <Typography> Remove from cart</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{mt:"2.5rem"}} variant="contained" color="warning" size="large" onClick={handelClick}>
        <Typography sx={{color:'#ffff'}}>Proceed to Order ${totalPrice}</Typography>
      </Button>
    </Container>
  );
};

export default Cart;

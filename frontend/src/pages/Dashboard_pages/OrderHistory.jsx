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
import { Container, Button, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const token = localStorage.getItem("token");
  const [orderHistory, setOrderHistory] = useState([]);
  const { cartItems, setCartItems } = useContext(CartContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/dashboard/order-history/",
        { headers }
      );
      setOrderHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const handleReorder = (cart) => {
    setCartItems(cart);
  };

  return (
    <Container sx={{ mt: "4.5rem" }}>
      <Typography
        variant="h3"
        component="h3"
        fontWeight="bold"
        sx={{ m: "10px 0 0 0" }}
        // color={colors.grey[300]}
      >
        Your Orders:
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
                  Created at
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Order status
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Address
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Medicine
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Total price
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Payment mode
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Payment status
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h5" fontWeight="bold">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory.map((order) => (
              <TableRow
                key={order.order_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Typography>{order.created_at}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{order.order_status}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{order.address_id}</Typography>
                </TableCell>

                <TableCell align="center">
                  {order.order_items.map((item) => (
                    <Box key={item.id} sx={{ display: "flex" }}>
                      <p>{item.title}</p>
                      <p>|</p>
                      <p>Quantity: {item.quantity}</p>
                    </Box>
                  ))}
                </TableCell>

                <TableCell align="center">
                  <Typography>{order.total_price}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{order.payment_mode}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{order.payment_status}</Typography>
                </TableCell>
                {/* { console.log(order.order_items)} */}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReorder(order.order_items)}
                    disabled={order.order_items.some(
                      (item) => item.quantity > item.stock_quantity
                    )}
                  >
                    Re-order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderHistory;

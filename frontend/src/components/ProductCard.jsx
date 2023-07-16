import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CartContext } from "../context/CartProvider";
import { tokens } from "../theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: "10px",
  },
  form: {
    alignItems: "center",
    marginBottom: "1rem",
    marginTop: "1.5rem",
  },
  addToCartBtn: {
    marginTop: "10px",
  },
  text: {
    color: "white",
  },
  button: {
    marginTop: "5px",
  },
});

const ProductCard = ({ product, stock }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const { addToCart } = useContext(CartContext);
  const isLowStock = stock && stock.quantity < 5;
  const isOutOfStock = stock && stock.quantity === 0;
  const stockQuantity = stock.quantity;
  const [showWarning, setShowWarning] = useState(false);
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    // Add logic here to add the product to the cart
    if (isOutOfStock || quantity == 0) {
      return; // Disable adding to cart when out of stock
    }

    if (quantity > stockQuantity) {
      setShowWarning(true);
      return;
    }

    const item = {
      ...product,
      quantity: parseInt(quantity),
    };
    addToCart(item);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowWarning(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        className={classes.root}
        style={{
          backgroundColor: colors.grey[900],
          opacity: isOutOfStock ? 0.9 : 1, // Reduce opacity for out of stock items
          pointerEvents: isOutOfStock ? "none" : "auto",
        }}
      >
        <Snackbar
          open={showWarning}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
            <AlertTitle>Warning</AlertTitle>
            Quantity exceeds available stock !
          </Alert>
        </Snackbar>
        <CardContent>
          <Typography variant="h3" component="h3">
            {product.title}
          </Typography>
          <Typography variant="h4" color="text.secondary" component="h4">
            {product.company}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            Price: ₹{product.price}
          </Typography>
          <form className={classes.form}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
              variant="outlined"
              size="small"
            />
            <div className={classes.button}>
              <Button
                className={classes.addToCartBtn}
                variant="contained"
                color="success"
                onClick={handleAddToCart}
                size="small"
                disabled={isOutOfStock}
              >
                <Typography className={classes.text}>Add to cart</Typography>
              </Button>

              {isLowStock && (
                <Typography variant="body5" color="error" component="p">
                  Low Stock: only {stock.quantity} are available
                </Typography>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;

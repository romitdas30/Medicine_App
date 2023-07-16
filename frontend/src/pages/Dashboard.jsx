import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar, NavBar } from "./../global/index";
import { Box, Grid, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../theme";
import axios from "axios";
import {
  Cart,
  CreateOrderbyPrescription,
  OrderHistory,
  AddressBook,
  Orders,
  Payment,
  Settings,
  SelectAddress
} from "./Dashboard_pages";
import { ProductCard } from "../components";
import { CartProvider } from "../context/CartProvider";

const Dashboard = () => {
  const [theme, colorMode] = useMode();
  const [products, setProducts] = useState([]);
  const [loading, setLoding] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');


  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/dashboard/", {
          headers,
        });
        if (response) {
          if (response.data) {
            setProducts(response.data.Product);
            console.log(products);
            localStorage.setItem("name", response.data.username)
            setLoding(true);
          } else {
            console.log("No data found.");
          }
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [loading]);
  const isDashboardActive = location.pathname.endsWith("/dashboard/");
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <NavBar />
              <Routes>
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/create-order-by-prescription"
                  element={<CreateOrderbyPrescription />}
                />
               
                <Route path="/address-book" element={<AddressBook />} />
                <Route path="/order-History" element={<OrderHistory />} />
                <Route
                  path="/order-created-by-prescription"
                  element={<AddressBook />}
                />
                <Route path="/orders" element={<Orders />} />
                <Route path="/choose-address" element={<SelectAddress />} />
                <Route
                  path="/payment"
                  element={<Payment />}
                />
                <Route path="/settings" element={<Settings />} />
              </Routes>

              {isDashboardActive && (
                <Box m={2}>
                  <Grid container spacing={2}>
                    {products.map((item) => (
                      <ProductCard key={item.id} product={item} stock={item.stock[0]}/>
                    ))}
                  </Grid>
                </Box>
              )}

            </main>
          </div>
        </CartProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;

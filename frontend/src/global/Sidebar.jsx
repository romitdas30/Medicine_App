import React from "react";
import { useState, useContext, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import Avatar from "../assets/image/Avatar.png";
// icon for orders 1
import MedicationIcon from "@mui/icons-material/Medication";

// icon for orderHistory 2
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
//icon for createOrderbyPrescription 3
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
//icon for orderHistorybyPrescription
//import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
//icon for hamburger menu
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
//icon for invoices 4
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
//import icon for Settings 5
import SettingsIcon from "@mui/icons-material/Settings";
//icon for pastPrescription 6
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
//icon for carts 7
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../index.css";
// icon for address book
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { CartContext } from "../context/CartProvider";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  liveCartIndicator: {
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    padding: "auto",
    width: "20px",
    height: "20px",
    textAlign: " center",
    marginLeft: "10px",
  },
  cartStyle: {
    display: "flex",
  },
});

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { cartItems } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setCartCount(cartItems.length);
    // console.log(cartCount);
  }, [cartItems]);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <div className={classes.cartStyle}>
        <Typography>{title}</Typography>

        {title === "Cart" && cartCount > 0 && (
          <div className={classes.liveCartIndicator}>{cartCount}</div>
        )}
      </div>
    </MenuItem>
  );
};

const Sidebar = () => {
  const { cartItems } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);
  console.log(cartCount);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState();
  const name = localStorage.getItem('name');
  return (
    <Box style={{ display: "flex !important", height: "100% !important" }}>
      <ProSidebar
        collapsed={isCollapsed}
        className="disable-hover-effect"
        style={{ border: "none !important" }}
        backgroundColor="rgb(249, 249, 249, 0.2)"
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            className="disable-hover-effect"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[200],
              border: "none !important",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                className="disable-hover-effect"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Medicine APP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Avatar}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[300]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>
                  Hi! Wellcome to our website
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            sx={{ py: "10px" }}
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            {/* Dashboard */}
            <MenuItem
              component={<Link to="/dashboard/" />}
              icon={<DashboardIcon />}
            >
              <Typography style={{ display: "flex-warp !important" }}>
                Dashboard
              </Typography>
            </MenuItem>

            {/* Orders */}
            {/* <Item
              title="Orders"
              to="/dashboard/orders"
              icon={<MedicationIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Item
              title="Order By Prescription"
              to="/dashboard/order-created-by-prescription"
              icon={<ContentPasteGoIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* Order History */}
            <Item
              title="Order History"
              to="/dashboard/order-History"
              icon={<WorkHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Cart */}

            <Item
              title="Cart"
              to="/dashboard/cart"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
              cartCount={cartCount}
            ></Item>

            {/* Address book */}
            <Item
              title="Adderss book"
              to="/dashboard/address-book"
              icon={<AutoStoriesIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Invoices
            <Item
              title="Invoices"
              to="/dashboard/invoices"
              icon={<ReceiptLongIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* Past Prescription */}
            {/* <Item
              title="Past Prescription"
              to="/dashboard/past-Prescription"
              icon={<NoteAddIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* settings */}
            {/* <Item
              title="Settings"
              to="/dashboard/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

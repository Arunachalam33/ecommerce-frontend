import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navItems = [
    { label: "Products", to: "/products" },
    ...(user?.is_admin
      ? [
          { label: "Add Product", to: "/admin/add-product" },
          { label: "User Orders", to: "/admin" }
        ]
      : []),
    { label: `Cart (${cartCount})`, to: "/cart" },
    { label: "My Orders", to: "/orders" },
    isAuthenticated
      ? { label: "Logout", onClick: logout, isLogout: true }
      : { label: "Login", to: "/login" }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/products"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            🛍️ MyShop
          </Typography>

          {!isMobile && (
            <Typography variant="subtitle1">
              Welcome {user?.username}
            </Typography>
          )}

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250, p: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Welcome {user?.username}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List>
                    {navItems.map((item, index) =>
                      item.isLogout ? (
                        <ListItem button key={index} onClick={item.onClick}>
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ) : (
                        <ListItem
                          button
                          key={index}
                          component={Link}
                          to={item.to}
                          onClick={toggleDrawer}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box>
              {navItems.map((item, index) =>
                item.isLogout ? (
                  <Button
                    key={index}
                    variant="outlined"
                    color="error"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    color="inherit"
                    component={Link}
                    to={item.to}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}


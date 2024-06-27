import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import kot from "/assets/kot.jpg";
import SpeedIcon from "@mui/icons-material/Speed";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditNoteIcon from "@mui/icons-material/EditNote";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ccffcc",
    color: "#2c3e50",
  },
  logo: {
    width: "80%",
    height: "auto",
    margin: "20px auto",
  },
  listItem: {
    "&:hover": {
      color: "black",
      backgroundColor: "#d7a022",
    },
  },
  selectedListItem: {
    color: "black",
    backgroundColor: "#d7a022",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Sidebar = ({ userRole }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      sx={{ backgroundColor: "grey" }}
    >
      <List>
        <Box textAlign="center">
          <img src="/assets/betlogin.png" alt="Logo" className={classes.logo} />
        </Box>

        {userRole === "cashier" && (
          <>
            <ListItem
              className={`${classes.listItem} ${
                location.pathname === "/dashboard" ? classes.selectedListItem : ""
              }`}
              component={Link}
              to="/dashboard"
              selected={location.pathname === "/dashboard"}
              button
              onClick={handleClick}
            >
              <ListItemIcon
                style={{
                  color: location.pathname.startsWith("/dashboard")
                    ? "black"
                    : "#d7a022",
                }}
              >
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  className={`${classes.listItem} ${
                    location.pathname === "/dash_ljd"
                      ? classes.selectedListItem
                      : ""
                  }`}
                  component={Link}
                  to="/dash_ljd"
                  selected={location.pathname === "/dash_ljd"}
                  button
                  className={classes.nested}
                >
                  <ListItemText primary="Dash ljd" />
                </ListItem>
                <ListItem
                  className={`${classes.listItem} ${
                    location.pathname === "/kjf" ? classes.selectedListItem : ""
                  }`}
                  component={Link}
                  to="/kjf"
                  selected={location.pathname === "/kjf"}
                  button
                  className={classes.nested}
                >
                  <ListItemText primary="kjf" />
                </ListItem>
                <ListItem
                  className={`${classes.listItem} ${
                    location.pathname === "/skdfj"
                      ? classes.selectedListItem
                      : ""
                  }`}
                  component={Link}
                  to="/skdfj"
                  selected={location.pathname === "/skdfj"}
                  button
                  className={classes.nested}
                >
                  <ListItemText primary="skdfj" />
                </ListItem>
                <ListItem
                  className={`${classes.listItem} ${
                    location.pathname === "/pay" ? classes.selectedListItem : ""
                  }`}
                  component={Link}
                  to="/pay"
                  selected={location.pathname === "/pay"}
                  button
                  className={classes.nested}
                >
                  <ListItemText primary="pay" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              className={`${classes.listItem} ${
                location.pathname === "/KegeberewOrdersLisit"
                  ? classes.selectedListItem
                  : ""
              }`}
              component={Link}
              to="/KegeberewOrdersLisit"
              selected={location.pathname === "/KegeberewOrdersLisit"}
              button
            >
              <ListItemIcon
                style={{
                  color: location.pathname === "/KegeberewOrdersLisit"
                    ? "black"
                    : "#d7a022",
                }}
              >
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Order List" />
            </ListItem>

            <ListItem
              className={`${classes.listItem} ${
                location.pathname === "/UpdateOrder"
                  ? classes.selectedListItem
                  : ""
              }`}
              component={Link}
              to="/UpdateOrder"
              selected={location.pathname === "/UpdateOrder"}
              button
            >
              <ListItemIcon
                style={{
                  color: location.pathname === "/UpdateOrder"
                    ? "black"
                    : "#d7a022",
                }}
              >
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Update Order" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;

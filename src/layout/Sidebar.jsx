import React, { useState } from "react";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SpeedIcon from "@mui/icons-material/Speed";
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditNoteIcon from '@mui/icons-material/EditNote';

const drawerWidth = 200; // Reduced width

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: "#d3f9d8", // Light green color
    color: "#2c3e50",
  },
}));

const Logo = styled('img')({
  width: "80%",
  height: "auto",
  margin: "20px auto",
});

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    color: "black",
    backgroundColor: "#d7a022",
  },
}));

const SelectedListItem = styled(ListItem)(({ theme }) => ({
  color: "black",
  backgroundColor: "#d7a022",
}));

const NestedListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const [tryFectaOpen, setTryFectaOpen] = useState(false);
  const [kunellaOpen, setKunellaOpen] = useState(false);
  const [animationOpen, setAnimation] = useState(false);

  const handleTryFectaClick = () => {
    setTryFectaOpen(!tryFectaOpen);
    // setKunellaOpen(false); // Close Kunella dropdown
  };

  const handleKunellaClick = () => {
    setKunellaOpen(!kunellaOpen);
    // setTryFectaOpen(false); // Close TryFecta dropdown
  };

  const handleAnimation = () => {
    setAnimation(!animationOpen);
    // setTryFectaOpen(false); // Close TryFecta dropdown
  };

  return (
    <DrawerStyled variant="permanent">
      <List>
        <Box textAlign="center">
          <Logo src="/assets/betlogin.png" alt="Logo" />
        </Box>

        {userRole === "cashier" && (
          <>
            <ListItemStyled
              button
              onClick={handleTryFectaClick}
              className={location.pathname.startsWith("/tryfecta") ? SelectedListItem.className : ""}
            >
              <ListItemIcon style={{ color: location.pathname.startsWith("/tryfecta") ? "black" : "#d7a022" }}>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="TryFecta" />
              {tryFectaOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemStyled>
            <Collapse in={tryFectaOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NestedListItem
                  component={Link}
                  to="/tryfecta/Dashboard"
                  selected={location.pathname === "/tryfecta/Dashboard"}
                  button
                >
                  <ListItemText primary="Dashboard" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/tryfecta/Home"
                  selected={location.pathname === "/tryfecta/Home"}
                  button
                >
                  <ListItemText primary="Home" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/tryfecta/TicketResult"
                  selected={location.pathname === "/tryfecta/TicketResult"}
                  button
                >
                  <ListItemText primary="Ticket Result" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/tryfecta/pay"
                  selected={location.pathname === "/tryfecta/pay"}
                  button
                >
                  <ListItemText primary="Pay" />
                </NestedListItem>
              </List>
            </Collapse>

            <ListItemStyled
              button
              onClick={handleKunellaClick}
              className={location.pathname.startsWith("/Keno") ? SelectedListItem.className : ""}
            >
              <ListItemIcon style={{ color: location.pathname.startsWith("/Keno") ? "black" : "#d7a022" }}>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Keno" />
              {kunellaOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemStyled>
            <Collapse in={kunellaOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NestedListItem
                  component={Link}
                  to="/Keno/Dashboard"
                  selected={location.pathname === "/Keno/Dashboard"}
                  button
                >
                  <ListItemText primary="Dashboard" />
                  </NestedListItem>
        

            
                <NestedListItem
                  component={Link}
                  to="/Keno/Home"
                  selected={location.pathname === "/Keno/Home"}
                  button
                >
                  <ListItemText primary="Home" />
                </NestedListItem>
               

                <NestedListItem
                  component={Link}
                  to="/Keno/TicketResult"
                  selected={location.pathname === "/Keno/TicketResult"}
                  button
                >
                  <ListItemText primary="Ticket Result" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/Keno/pay"
                  selected={location.pathname === "/Keno/pay"}
                  button
                >
                  <ListItemText primary="Pay" />
                </NestedListItem>
              </List>
            </Collapse>


            <ListItemStyled
              button
              onClick={handleAnimation}
              className={location.pathname.startsWith("/animation") ? SelectedListItem.className : ""}
            >
              <ListItemIcon style={{ color: location.pathname.startsWith("/animation") ? "black" : "#d7a022" }}>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Animation" />
              {animationOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemStyled>
            <Collapse in={animationOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NestedListItem
                  component={Link}
                  to="/animation/Dashboard"
                  selected={location.pathname === "/animation/Dashboard"}
                  button
                >
                  <ListItemText primary="Dashboard" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/animation/Home"
                  selected={location.pathname === "/animation/Home"}
                  button
                >
                  <ListItemText primary="Home" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/animation/TicketResult"
                  selected={location.pathname === "/animation/TicketResult"}
                  button
                >
                  <ListItemText primary="Ticket Result" />
                </NestedListItem>
                <NestedListItem
                  component={Link}
                  to="/animation/pay"
                  selected={location.pathname === "/animaiton/pay"}
                  button
                >
                  <ListItemText primary="Pay" />
                </NestedListItem>
              </List>
            </Collapse>
          </>
        )}
      </List>
    </DrawerStyled>
  );
};

export default Sidebar;
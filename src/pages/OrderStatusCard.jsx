import React from "react";
import { Card, CardContent, Box, Typography, ListItemIcon } from "@mui/material";

const OrderStatusCard = ({ status, count, icon, handleCardClick }) => (
  <Card
    key={status}
    sx={{
      marginTop: "16px",
      padding: "25px",
      backgroundColor: "#f0f0f0",
      transition: "transform 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    onClick={() => handleCardClick(status)}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", height: "10px" }}>
        {icon} {/* Render the icon */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        >
          {status}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "25px", paddingTop: "20px" }}>
        {count}
      </Typography>
    </CardContent>
  </Card>
);

export default OrderStatusCard;

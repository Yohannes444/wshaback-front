import React from "react";
import { Box } from "@mui/material";
import OrderStatusCard from "./OrderStatusCard";

const OrderStatusList = ({ orderStatusCounts, statusIcons, handleCardClick }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    {Object.entries(orderStatusCounts).map(([status, count]) => (
      <OrderStatusCard
        key={status}
        status={status}
        count={count}
        icon={statusIcons[status]}
        handleCardClick={handleCardClick}
      />
    ))}
  </Box>
);

export default OrderStatusList;

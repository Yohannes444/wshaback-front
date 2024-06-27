import React, { useState, useEffect } from "react";
import { Box, Typography, ListItemIcon } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import { BASE_URL_LOGIN } from "../api/baseURL";
import InputForm from "./InputForm";
import OrderStatusList from "./OrderStatusList";

export default function CardInvertedColors() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    fulfilled: 0,
    dispatched: 0,
    at_distribution_center: 0,
    delivering: 0,
    delivered: 0,
  });

  const [orderDetail, setOrderDetail] = useState({
    fulfilled: [],
    dispatched: [],
    at_distribution_center: [],
    delivering: [],
    delivered: [],
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load state from localStorage
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedOrderStatusCounts = localStorage.getItem("orderStatusCounts");
    const savedOrderDetail = localStorage.getItem("orderDetail");

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    if (savedOrderStatusCounts && savedOrderDetail) {
      setOrderStatusCounts(JSON.parse(savedOrderStatusCounts));
      setOrderDetail(JSON.parse(savedOrderDetail));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Save form data to localStorage
    localStorage.setItem("formData", JSON.stringify(newFormData));
  };

  const handleGetOrderClick = async () => {
    const { startDate, endDate } = formData;

    if (!startDate || !endDate) {
      setError("Both start date and end date are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `${BASE_URL_LOGIN}/api/order/order_status?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      toast.success("Fetched order status successfully");

      const orders = data.orders.flat();
      const keys = Object.keys(orderStatusCounts);

      if (Array.isArray(data.orders)) {
        const newOrderStatusCounts = {};
        const newOrderDetail = {};

        data.orders.forEach((array, index) => {
          if (index < keys.length) {
            newOrderStatusCounts[keys[index]] = array.length;
            newOrderDetail[keys[index]] = array;
          }
        });

        setOrderStatusCounts(newOrderStatusCounts);
        setOrderDetail(newOrderDetail);

        // Save to localStorage
        localStorage.setItem("orderStatusCounts", JSON.stringify(newOrderStatusCounts));
        localStorage.setItem("orderDetail", JSON.stringify(newOrderDetail));
      } else {
        console.error("Data.orders is not an array or is undefined/null.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching order status");
      console.error("Error fetching order status:", error);
      setError(`Error fetching order status. ${error}.`);
    }
  };

  const statusIcons = {
    delivering: (
      <ListItemIcon style={{ color: "#d7a022" }}>
        <LocalShippingIcon />
      </ListItemIcon>
    ),
    dispatched: (
      <ListItemIcon style={{ color: "#d7a022" }}>
        <StoreIcon />
      </ListItemIcon>
    ),
    at_distribution_center: (
      <ListItemIcon style={{ color: "#d7a022" }}>
        <StoreIcon />
      </ListItemIcon>
    ),
    fulfilled: (
      <ListItemIcon style={{ color: "#d7a022" }}>
        <DoneAllIcon />
      </ListItemIcon>
    ),
    delivered: (
      <ListItemIcon style={{ color: "#d7a022" }}>
        <DoneAllIcon />
      </ListItemIcon>
    ),
  };

  const handleCardClick = (status) => {
    navigate(`/OrderStatusCounDetail`, { state: { orderDetail: orderDetail[status] } });
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <InputForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleGetOrderClick={handleGetOrderClick}
        loading={loading}
      />
      {error && (
        <Typography sx={{ marginBottom: "16px", color: "red" }}>
          {error}
        </Typography>
      )}
      <OrderStatusList
        orderStatusCounts={orderStatusCounts}
        statusIcons={statusIcons}
        handleCardClick={handleCardClick}
      />
    </Box>
  );
}

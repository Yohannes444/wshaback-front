import * as React from "react";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Import Button from MUI
import * as XLSX from "xlsx";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import TableComponent from "./TicketTable"; // Import the new TableComponent

const columns = [
  { id: "orderId", label: "Order ID", minWidth: 120 },
  { id: "customerName", label: "Customer Name", minWidth: 170 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 170 },
  { id: "createdAt", label: "Created At", minWidth: 170 },
  { id: "updatedDate", label: "Order Updated Date", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 150 },
];

const fetchDataByDate = async (selectedDate) => {
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const url = `http://localhost:3000/getdatas?date=${formattedDate}`;
  // const url = `http://localhost:5454/anime-hors`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchDataById = async (ticketID) => {
  // const url = `http://localhost:3000/getdatas?ticketID=${ticketID}`;
  const url = `http://localhost:5454/anime-hors/${ticketID}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Styled Button with black color
const BlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

export default function StickyHeadTable() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [ticketID, setTicketID] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTicketIDChange = (event) => {
    setTicketID(event.target.value);
  };

  const handleGetDataByDate = async () => {
    if (!selectedDate) {
      return;
    }
    const data = await fetchDataByDate(selectedDate);
    const formattedData = data.map((order) =>
      createData(
        order.order_id,
        order.name,
        order.order_receiver_phone_number,
        order.createdAt,
        order.updatedAt,
        order.order_status
      )
    );
    setRows(formattedData);
  };

  const handleGetDataById = async () => {
    if (!ticketID) {
      return;
    }
    const data = await fetchDataById(ticketID);
    const formattedData = createData(
      data.order_id,
      data.name,
      data.order_receiver_phone_number,
      data.createdAt,
      data.updatedAt,
      data.order_status
    );
    setRows([formattedData]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Set column headers with grey background
    const headers = columns.map((column) => {
      return { v: column.label, s: { fill: { bgColor: { rgb: "CCCCCC" } } } };
    });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.v)], {
      origin: "A1",
    });

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "16px", fontWeight: "bold" }}
      >
        Ticket History Page
      </Typography>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <TextField
          id="date"
          label="Select Date"
          type="date"
          value={selectedDate || ""} // Ensure value is not null
          onChange={(e) => handleDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "16px" }}
          inputProps={{
            max: format(new Date(), "yyyy-MM-dd"),
          }}
        />
        <BlackButton variant="contained" onClick={handleGetDataByDate}>
          Get Data by Date
        </BlackButton>
        <div style={{ marginLeft: "16px" }}>
          <TextField
            id="ticketID"
            label="Enter Ticket ID"
            value={ticketID}
            onChange={handleTicketIDChange}
            sx={{ marginLeft: "16px" }}
          />
          <BlackButton variant="contained" onClick={handleGetDataById}>
            Search by ID
          </BlackButton>
        </div>
        <div style={{ flex: 1 }} />
        <Button
          variant="contained"
          color="secondary"
          onClick={exportToExcel}
          disabled={rows.length === 0}
        >
          Export to Excel
        </Button>
      </div>
      <TableComponent columns={columns} rows={rows} />
    </Paper>
  );
}

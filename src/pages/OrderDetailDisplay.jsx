import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import TableComponent from "./TicketTable";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Select from "@mui/material/Select";
import axios from 'axios';
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { id: "gameId", label: "Game ID", minWidth: 100 },
  { id: "tiketId", label: "Ticket ID", minWidth: 120 },
  { id: "payd", label: "Pay status", minWidth: 50 },
  { id: "canceled", label: "Cancelled", minWidth: 50 },
  { id: "createdAt", label: "Created At", minWidth: 170 },
  { id: "updatedDate", label: "Order Updated Date", minWidth: 170 },
  { id: "totslPrize", label: "Total Prize", minWidth: 150 },
  { id: "ticketerName", label: "Ticketer Name", minWidth: 100 },
];

const fetchDataByDate = async (selectedStartDate, selectedEndDate) => {
  const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd");
  const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd");
  const url = `http://localhost:5454/grayhorn/filter?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
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

const fetchDataByGameId = async (gameId) => {
  const url = `http://localhost:5454/grayhorn/filter?gameId=${encodeURIComponent(gameId)}`;
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


const fetchDataByDropdownValue = async (dropdownValue) => {
  const url = `http://localhost:5454/grayhorn/filter`; // Update with your endpoint
  try {
    const params = {};
    params[dropdownValue] = true; // Dynamically create the object with key-value pair

    const response = await axios.get(url, {
      params: params
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};





const BlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

export default function StickyHeadTable() {
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedDateEndDate] = React.useState(null);
  const [gameId, setGameId] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [dropdownValue, setDropdownValue] = React.useState("");

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedDateEndDate(date);
  };

  const handlegameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleDropdownChange = async (event) => {
    const value = event.target.value;
    setDropdownValue(value);
    const data = await fetchDataByDropdownValue(value);
    const formattedData = data.map((ticket) =>
      createData(
        ticket.gameId,
        ticket.tiketId,
        ticket.payd,
        ticket.canceled,
        ticket.createdAt,
        ticket.updatedAt,
        ticket.totslPrize,
        ticket.tiketerId.name
      )
    );
    setRows(formattedData);
  };

  const handleGetDataByDate = async () => {
    if (!selectedStartDate && !selectedEndDate) {
      return;
    }
    const data = await fetchDataByDate(selectedStartDate, selectedEndDate);
    const formattedData = data.map((ticket) =>
      createData(
        ticket.gameId,
        ticket.tiketId,
        ticket.payd,
        ticket.canceled,
        ticket.createdAt,
        ticket.updatedAt,
        ticket.totslPrize,
        ticket.tiketerId.name
      )
    );
    setRows(formattedData);
  };

  const handleGetDataById = async () => {
    if (!gameId) {
      return;
    }
    const data = await fetchDataByGameId(gameId);
    const formattedData = createData(
      data.gameId,
      data.tiketId,
      data.payd,
      data.canceled,
      data.createdAt,
      data.updatedAt,
      data.totslPrize,
      data.tiketerId.name
    );
    setRows([formattedData]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const headers = columns.map((column) => {
      return { v: column.label, s: { fill: { bgColor: { rgb: "CCCCCC" } } } };
    });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.v)], {
      origin: "A1",
    });

    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "16px", fontWeight: "bold" }}
      >
        TryFecta Ticket History Page
      </Typography>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <TextField
          id="date"
          label="Select Start Date"
          type="date"
          value={selectedStartDate || ""}
          onChange={(e) => handleStartDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "16px", marginLeft: "16px" }}
          inputProps={{
            max: format(new Date(), "yyyy-MM-dd"),
          }}
        />

        <TextField
          id="date"
          label="Select End Date"
          type="date"
          value={selectedEndDate || ""}
          onChange={(e) => handleEndDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "16px" }}
          inputProps={{
            max: format(new Date(), "yyyy-MM-dd"),
          }}
        />

        <BlackButton variant="contained" sx={{ padding: "5px" }} onClick={handleGetDataByDate}>
          Get Data
        </BlackButton>

        <Select
          value={dropdownValue}
          onChange={handleDropdownChange}
          displayEmpty
          sx={{ marginLeft: "16px", marginRight: "16px" }}
        >
          <MenuItem value="" disabled>
            Select an option
          </MenuItem>
          <MenuItem value="payd">Paied</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>

        <div style={{ marginLeft: "14px" }}>
          <TextField
            id="GameID"
            label="Enter Game ID"
            value={gameId}
            onChange={handlegameIdChange}
            sx={{ marginLeft: "16px" }}
          />
          <BlackButton variant="contained" sx={{ marginLeft: "15px", padding: "10px", marginTop:'5px'}} onClick={handleGetDataById}>
            Search by GameID
          </BlackButton>
        </div>

        <div style={{ flex: 1 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          disabled={rows.length === 0}
          sx={{ marginRight: "16px", padding: "10px" }}
        >
          Export to Excel <FileDownloadIcon />
        </Button>
      </div>
      <TableComponent columns={columns} rows={rows} />
    </Paper>
  );
}

function createData(gameId, tiketId, payd,canceled, createdAt, updatedDate, totslPrize, ticketerName) {
  return { gameId, tiketId, payd, createdAt,canceled, updatedDate, totslPrize,ticketerName };
}
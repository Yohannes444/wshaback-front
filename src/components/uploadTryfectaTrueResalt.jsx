import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {BASE_URL} from "../api/baseURL";


const BlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

const UploadAndCompareResults = ({ onComparisonResults }) => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const uploadAndCompareFile = async () => {
    if (!file || !date) {
      alert("Please upload a file and select a date");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);

    try {
      const response = await axios.post(`${BASE_URL}/tryfecta-result-checkup/compareResults`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onComparisonResults(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload and compare file');
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        Upload and Compare Results by Date
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
        <TextField
          type="date"
          value={date}
          onChange={handleDateChange}
          sx={{ marginBottom: "16px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="file"
          inputProps={{ accept: ".xlsx, .xls" }}
          onChange={handleFileUpload}
        />
        <BlackButton variant="contained" onClick={uploadAndCompareFile} startIcon={<FileUploadIcon />}>
          Upload and Compare File
        </BlackButton>
      </Box>
    </Paper>
  );
};

export default UploadAndCompareResults;
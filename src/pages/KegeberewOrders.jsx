import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { initializeUser, selectUser } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  fetchingStart,
  getKegeberewuOrder,
  getKegeberewuOrderFailure,
} from "../redux/slice/kegeberewuOrderSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BASE_URL_KEGEBEREW, BASE_URL_LOGIN } from "../api/baseURL";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "customerName", label: "Customer Name", minWidth: 120 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 120 },
  { id: "createdAt", label: "Created At", minWidth: 120 },
  { id: "updatedDate", label: "Order Updated ", minWidth: 120 },
  { id: "paindAmount", label: "Paid Amount", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(order) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return {
    orderId: order.id,
    customerName: order.billing.first_name + " " + order.billing.last_name,
    phoneNumber: order.billing.phone,
    createdAt: formatDate(order.date_created),
    updatedDate: formatDate(order.date_modified),
    paindAmount: order.total + " " + order.currency,
    status: order.status,
    fullData: order, // Keep the full data for later use
  };
}

export default function StickyHeadTable() {
  const { currentFetchedData, loading, error } = useSelector(
    (state) => state.KegeberewuOrderList
  );
  const [data, setData] = useState([]);
  const [loadingFullfield, setLoadingFullfield] = useState(null); // Use null to represent no loading state
  const [processedOrders, setProcessedOrders] = useState([]); // State to keep track of processed orders
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [NumberOfPage, setNumberOfPage]= useState(1);  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const consumerKey = "ck_88dd877c0eac2d110bb3a67523a06805121a0321";
  const consumerSecret = "cs_b80c89da4f49b89d44e3bc25dabd77a4d7e0d67a";
  const perPage = 5; //number of data

  const getTodayStartAndEndDate = () => {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    return { start, end };
  };

  useEffect(() => {
    const fetchData = async () => {
      const { start, end } = getTodayStartAndEndDate();

      try {
        dispatch(fetchingStart());
        const response = await axios.get(`${BASE_URL_KEGEBEREW}`, {
          params: {
            status: "processing,completed",
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            per_page: perPage,
            modified_after: start,
            modified_before: end,
            page: NumberOfPage,
          },
        });
        if (response.status !== 200) {
          dispatch(getKegeberewuOrderFailure(response.status));
          return;
        }
        const formattedData = response.data?.map((order) => createData(order));
        dispatch(getKegeberewuOrder(formattedData));
      } catch (err) {
        dispatch(getKegeberewuOrderFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch, NumberOfPage]);

  useEffect(() => {
    setData(currentFetchedData || []);
  }, [currentFetchedData]);

  if (loading) {
    return (
      <Box
        display="flex"
        marginTop={-15}
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
        Loading...
      </Box>
    );
  }

  if (error)
    return (
      <Box
        display="flex"
        marginTop={-15}
        fontSize={50}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        color="red"
      >
        Error: {error}
      </Box>
    );

   const  handleNextPage = ()=>{
    setNumberOfPage((prevPage) => prevPage + 1);
    // NumberOfPage+=event.target.value;
   }

    const handlePrevPage = () => {
      setNumberOfPage((prevPage) => {
          if (prevPage > 1) {
              return prevPage - 1;
          } else {
              return prevPage; // or you could handle it differently, like showing an alert
          }
      });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleButtonClick = (row) => {
    setLoadingFullfield(row.orderId); // Set the orderId of the current row being processed
    const { fullData } = row;
    console.log(fullData);
    const postData = {
      order_id: fullData.id,
      order_status: "Active",
      userId: `${user.id}`,
      name: fullData.billing.first_name + " " + fullData.billing.last_name,
      phone: fullData.billing.phone,
      order_delivery_address: {
        name: fullData.billing.address_1,
        subcity: "",
        city: fullData.shipping.city,
        country: fullData.shipping.country,
      },
      line_items: fullData.line_items.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
      })),
    };

    axios
      .post(`${BASE_URL_LOGIN}/api/order/create`, postData)
      .then((response) => {
        if (response.status === 200) {
          setProcessedOrders((prev) => [...prev, row.orderId]);
        }
        setLoadingFullfield(null); // Clear the loading state
        toast.success("Data sent successfully");
      })
      .catch((error) => {
        setLoadingFullfield(null); // Clear the loading state
        toast.error(`There was an error sending the data!, ${error}`);
      });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "16px", fontWeight: "bold" }}
      >
        Kegeberew Today Orders List
      </Typography>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.orderId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            processedOrders.includes(row.orderId) ? (
                              <CheckCircleOutlineIcon
                                style={{ color: "green" }}
                              />
                            ) : (
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                onClick={() => handleButtonClick(row)}
                                disabled={loadingFullfield === row.orderId}
                              >
                                {loadingFullfield === row.orderId ? (
                                  <CircularProgress size={24} color="inherit" />
                                ) : (
                                  "Fullfield"
                                )}
                              </Button>
                            )
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length} // Ensure data has a default value
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      
<Button
      variant="contained"
      onClick={handlePrevPage}
      sx={{
        margin: "16px",
        backgroundColor: NumberOfPage === 1 ? "grey" : "black",
        color: "white",
        '&:disabled': {
          backgroundColor: "grey",
          color: "lightgrey"
        }
      }}
      disabled={NumberOfPage === 1}
    >
      Prev Page
    </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
        onClick={handleNextPage}
        sx={{ margin: "16px" }}
      >
        Next Page
      </Button>


    </Paper>
  );
}

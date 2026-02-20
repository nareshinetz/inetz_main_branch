import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, deleteTransaction } from "../redux/slices/transacitonSlice";
import AgGridTable from "../generic/AgGridTable";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DownloadDropdown from "../generic/DropDown";


const TransactionHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { transactions = [], loading = false, error = null } =
    useSelector((state) => state.transactions || {});

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/transactions/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/transactions/view/${id}`);
  };

  const downloadColumns = useMemo(
      () => [
        { header: "Student Id", key: "studentId", width: 25 },
        { header: "Student Name", key: "studentName", width: 30 },
        { header: "Payment Date", key: "paymentDate", width: 15 },
        { header: "Paid Amount", key: "paidAmount", width: 20 },
        { header: "Payment Mode", key: "paymentMode", width: 20 },
      ],
      []
    );

  const transactionColumns = useMemo(
    () => [
      {
        headerName: "Student ID",
        field: "studentId",
        filter: true,
        headerComponentParams: {
          style: { textAlign: "center", width: "100%" },
        },
        cellStyle: {
          textAlign: "center",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
        },
        cellRenderer: (params) => (
          <Typography
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => handleView(params.data.paymentId)}
          >
            {params.value}
          </Typography>
        ),
      },
            {
        headerName: "Payment Date",
        field: "paymentDate",
        sortable: true,
      },
      {
        headerName: "Student Name",
        field: "studentName",
      },
      {
        headerName: "Paid Amount",
        valueGetter: (params) => `₹${params.data.paidAmount || 0}`,
        sortable: true,
      },
      {
        headerName: "Payment Mode",
        valueGetter: (params) => params.data.paymentMode || "-",
        filter: true,
      },
      {
        headerName: "Actions",
        cellRenderer: (params) => (
          <Box display="flex" gap={1}>
            <Tooltip title="Edit">
              <IconButton color="warning" onClick={() => handleEdit(params.data.paymentId)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(params.data.paymentId)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [navigate]
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        Failed to load transactions: {error}
      </Alert>
    );
  }

  return (<>
    
    <Box>
      {/* <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Transactions List
      </Typography> */}

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="right" mb={2} flexWrap="wrap" gap={3} >
                      <DownloadDropdown
                        data={transactions}
                        columns={downloadColumns}
                        fileName="transaction_history"
                        sheetName="Transaction"
                        title="TRANSACTION HISTORY REPORT"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/payments/add")}
                      >
                        Add
                      </Button>
                    </Box>
          <AgGridTable
            rowData={transactions || []}
            columnDefs={transactionColumns}
            loadingMessage="Fetching transactions..."
          />
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default TransactionHistory;

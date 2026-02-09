import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../redux/slices/transacitonSlice";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactions = [] } = useSelector(
    (state) => state.transactions || {}
  );

  const transaction = transactions.find(
    (t) => String(t.id) === String(id)
  );

  useEffect(() => {
    if (!transactions.length) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, transactions.length]);

  if (!transaction) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Transaction not found
      </Typography>
    );
  }

  const InfoItem = ({ label, value, highlight }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        fontWeight={600}
        color={highlight ? "error.main" : "inherit"}
      >
        {value ?? "-"}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", px: 2 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Header */}
          <Typography variant="h5" fontWeight={700} mb={1}>
            Transaction Details
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Complete transaction payment information
          </Typography>

          {/* Transaction Info */}
          <Typography fontWeight={700} mb={1}>
            Transaction Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InfoItem label="Transaction ID" value={transaction.id} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Student ID"
                value={transaction.studentId}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Payment Method"
                value={transaction.paymentMode}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Payment Date"
                value={transaction.date}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Status"
                value={transaction.status}
              />
            </Grid>
          </Grid>

          {/* Amount Info */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Fee Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Total Fees"
                value={`₹${transaction.totalFee}`}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Paid Amount"
                value={`₹${transaction.amount}`}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Pending Amount"
                value={`₹${transaction.pendingAmount}`}
                highlight
              />
            </Grid>
          </Grid>

          {/* Notes */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Notes
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" sx={{ maxWidth: 800 }}>
            {transaction.notes || "-"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionDetails;

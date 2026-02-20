import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionById } from "../redux/slices/transacitonSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  fetchStudentTransactions,
} from "../redux/slices/transacitonSlice";



const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const {
  selectedTransaction: transaction,
  studentTransactions,
  loading,
} = useSelector((state) => state.transactions);

useEffect(() => {
  if (id) {
    dispatch(fetchTransactionById(id));
  }
}, [dispatch, id]);

useEffect(() => {
  if (transaction?.studentId) {
    dispatch(fetchStudentTransactions(transaction.studentId));
  }
}, [dispatch, transaction?.studentId]);


  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }

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
              <InfoItem label="Transaction ID" value={transaction.paymentId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Student ID" value={transaction.studentId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Student Name" value={transaction.studentName} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Payment Method" value={transaction.paymentMode || "-"} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Payment Date" value={transaction.paymentDate} />
            </Grid>
          </Grid>

          {/* Amount Info */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Fee Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InfoItem label="Total Fees" value={`₹${transaction.totalFees || "-"}`} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Paid Amount" value={`₹${transaction.paidAmount || 0}`} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Pending Amount"
                value={`₹${transaction.pendingAmount || 0}`}
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

          {/* Transaction History */}
<Typography fontWeight={700} mt={5} mb={1}>
  Student Transaction History
</Typography>
<Divider sx={{ mb: 3 }} />

<Grid container spacing={2}>
  {studentTransactions.map((item) => (
    <Grid item xs={12} key={item.id}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <InfoItem label="Transaction ID" value={item.paymentId} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <InfoItem label="Paid Amount" value={`₹${item.paidAmount}`} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <InfoItem label="Pending" value={`₹${item.pendingAmount}`} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <InfoItem label="Date" value={item.paymentDate} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionDetails;

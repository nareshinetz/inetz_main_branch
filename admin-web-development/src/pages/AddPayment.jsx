import React, { useEffect, useState } from "react";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentById } from "../redux/slices/studentSlice";
import StatusModal from "../generic/StatusModel";




const paymentMethods = ["Cash", "GPay", "NEFT"];

const AddPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const { selectedStudent, loading, error } = useSelector(
  (state) => state.students
);


  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [payAmount, setPayAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [localError, setLocalError] = useState("");


const [statusModal, setStatusModal] = useState({
  open: false,
  type: "success",
  title: "",
  message: "",
});

  const [formError, setFormError] = useState("");

  useEffect(() => {
  if (location.state?.studentId) {
    setStudentId(location.state.studentId);
  }
}, [location.state]);


  /* ================= FETCH STUDENT ================= */
  const handleFetchStudent = async () => {
  if (!studentId) {
    setLocalError("Please enter Student ID");
    return;
  }

  const result = await dispatch(fetchStudentById(studentId));

  if (fetchStudentById.fulfilled.match(result)) {
    const studentData = result.payload;

    console.log("Student:", studentData);

    setStudent(studentData);
    setDiscount(Number(studentData.discount || 0));
    setLocalError("");
  } else {
    setStudent(null);
    setLocalError("Student not found");
  }
};


  /* ================= CALCULATIONS ================= */
const totalFee = student?.studentFees?.totalFees || 0;
const amountPaid = student?.studentFees?.paidAmount || 0;
const pendingAmount = student?.studentFees?.pendingAmount || 0;

const actualFee = totalFee - discount;

  /* ================= SAVE PAYMENT ================= */
 const handlePayment = async () => {
  if (!payAmount || payAmount <= 0) {
    setFormError("Please enter a valid payment amount");
    return;
  }

  if (!paymentMethod) {
    setFormError("Please select a payment method");
    return;
  }

  if (discount > totalFee) {
    setFormError("Discount cannot exceed total fee");
    return;
  }

  if (
    (paymentMethod === "GPay" || paymentMethod === "NEFT") &&
    !transactionId
  ) {
    setFormError("Transaction ID is required for GPay/NEFT");
    return;
  }

  try {
    const response = await fetch("http://localhost:8082/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        paidAmount: Number(payAmount),
        paymentMode : paymentMethod,
        transactionId: paymentMethod === "Cash" ? null : transactionId,
        totalFees: totalFee,
        actualFees: actualFee,
        pendingAmount:pendingAmount,
        transactionId : transactionId,
        date: new Date().toLocaleDateString(),
      }),
    });

    if (!response.ok) throw new Error();

    setStatusModal({
      open: true,
      type: "success",
      title: "Payment Successful",
      message: "Payment has been recorded successfully.",
    });
  } catch {
    setStatusModal({
      open: true,
      type: "error",
      title: "Payment Failed",
      message: "Unable to process payment. Please try again.",
    });
  }
};

  /* ================= INFO ITEM ================= */
  const InfoItem = ({ label, value, highlight }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={700} color={highlight ? "error" : "inherit"}>
        {value}
      </Typography>
    </Stack>
  );

  if (loading) {
  return <Typography>Loading students...</Typography>;
}


  return (
    <Box sx={{ mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Payments
        </Link>
        <Typography color="text.primary" fontWeight={600}>
          Add Payment
        </Typography>
      </Breadcrumbs>

      <Card variant="outlined"
      sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}>
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <Typography variant="h5" fontWeight={700} mb={1}>
            Student Payment
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Fetch student and record payment
          </Typography>

          {/* ✅ Form validation errors */}
          {formError && (
            <Alert 
              severity="warning" 
              sx={{ mb: 3 }}
              onClose={() => setFormError("")}
            >
              {formError}
            </Alert>
          )}

          {/* ================= STUDENT ID ================= */}
          <Grid container spacing={3} mb={4} 
          sx={{
      display: "flex",          // enable flex// horizontal center
      alignItems: "center",     // vertical center          // take full Grid item height
    }}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 700,
                          "&:hover": {
                            boxShadow: "0 12px 32px rgba(25,118,210,0.45)",
                          },
                        }}
                onClick={handleFetchStudent}
              >
                Fetch Student
              </Button>
            </Grid>
          </Grid>

          {student && (
            <>
              {/* ================= STUDENT INFO ================= */}
              <Typography fontWeight={700} mb={1}>
                Student Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <InfoItem label="Student Name" value={student.studentName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem label="Email" value={student.email} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem
                    label="Phone Number"
                    value={student.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InfoItem label="Course Number" value={student.courseNumber} />

                </Grid>
              </Grid>

              {/* ================= FEE SUMMARY ================= */}
              <Typography fontWeight={700} mt={5} mb={1}>
                Fee Summary
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <InfoItem label="Total Fee" value={`₹${totalFee}`} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discount"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(Number(e.target.value || 0))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InfoItem label="Actual Amount" value={`₹${actualFee}`} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InfoItem label="Paid Amount" value={`₹${amountPaid}`} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InfoItem
                    label="Pending Amount"
                    value={`₹${pendingAmount}`}
                    highlight
                  />
                </Grid>
              </Grid>

              {/* ================= NEW PAYMENT ================= */}
              <Typography fontWeight={700} mt={5} mb={1}>
                New Payment
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Amount to Pay"
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    sx = {{width : 200 }}  // ✅ Fixed width issue
                    select
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setTransactionId("");
                    }}
                  >
                    {paymentMethods.map((m) => (
                      <MenuItem key={m} value={m}>
                        {m}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {(paymentMethod === "GPay" ||
                  paymentMethod === "NEFT") && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Transaction ID"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(e.target.value)
                      }
                    />
                  </Grid>
                )}
              </Grid>

              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 4 }}
                onClick={handlePayment}
              >
                Add Payment
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <StatusModal
  open={statusModal.open}
  type={statusModal.type}
  title={statusModal.title}
  message={statusModal.message}
  onClose={() => {
    setStatusModal({ ...statusModal, open: false });
    if (statusModal.type === "success") {
      navigate("/transactionhistory");
    }
  }}
/>

    </Box>
  );
};

export default AddPayment;
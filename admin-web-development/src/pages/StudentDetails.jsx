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
import { fetchStudents } from "../redux/slices/studentSlice";
import { fetchStudentTransactions } from "../redux/slices/transacitonSlice";
import AgGridTable from "../generic/AgGridTable";


const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.students);

  const columnDefs = [
    { headerName: "Transaction ID", field: "paymentId", flex: 1 },
    { headerName: "Payment Date", field: "paymentDate", flex: 1 },
    { headerName: "Payment Mode", field: "paymentMode", flex: 1 },
    {
      headerName: "Paid Amount",
      field: "paidAmount",
      flex: 1,
      valueFormatter: (params) => `₹${params.value}`
    },
  ];


  const student = students.find((s) => String(s.id) === id);

  useEffect(() => {
    if (!students.length) dispatch(fetchStudents());
  }, [dispatch, students.length]);

  if (!student) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Student not found
      </Typography>
    );
  }

  const InfoItem = ({ label, value }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>
        {value || "-"}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ mb: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          {/* Header */}
          <Typography variant="h5" fontWeight={700} mb={1}>
            Student Details
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Complete student profile information
          </Typography>

          {/* Personal Info */}
          <Typography fontWeight={700} mb={1}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Student Name" value={student.studentName} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Email ID" value={student.emailId} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Phone Number" value={student.phoneNumber} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="City" value={student.cityName} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Status" value={student.status} />
            </Grid>
          </Grid>

          {/* Academic Info */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Academic Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Program Type" value={student.programType} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Mode of Training" value={student.modeOfTraining} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Course Name" value={student.courseName} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="College Name" value={student.collegeName} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Degree" value={student.degree} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Department" value={student.department} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Year of Study" value={student.yearOfStudy} />
            </Grid>
          </Grid>

          {/* Marks */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Academic Marks
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InfoItem label="SSLC Mark" value={student.sslcMark} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="HSC Mark" value={student.hscMark} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="UG Mark" value={student.ugMark} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="PG Mark" value={student.pgMark} />
            </Grid>
          </Grid>

          {/* Comments */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Comments
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" sx={{ maxWidth: 800 }}>
            {student.comments || "-"}
          </Typography>

          {/* Fee Information */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Fee Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InfoItem label="Total Fees" value={`₹${student.studentFees?.totalFees ?? "-"}`} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem label="Paid Amount" value={`₹${student.studentFees?.paidAmount ?? 0}`} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Pending Amount"
                value={`₹${student.studentFees?.pendingAmount ?? 0}`}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InfoItem
                label="Status"
                value={`₹${student.studentFees?.status}`}
              />
            </Grid>
          </Grid>

          

          {/* Transaction History */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Transaction History
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <AgGridTable
            rowData={student.studentFees.payments || []}
            columnDefs={columnDefs}
            loadingMessage="Loading transactions..."
          />


        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentDetails;

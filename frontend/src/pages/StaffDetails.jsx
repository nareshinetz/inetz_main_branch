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
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../redux/slices/staffSlice";

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { staff, loading } = useSelector((state) => state.staff);

  useEffect(() => {
    if (!staff.length) {
      dispatch(fetchStaff());
    }
  }, [dispatch, staff.length]);

  const staffMember = staff.find((s) => String(s.id) === id);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!staffMember) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Staff not found
      </Typography>
    );
  }

  const InfoItem = ({ label, value }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>{value || "-"}</Typography>
    </Stack>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <Typography variant="h5" fontWeight={700} mb={1}>
            Staff Details
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Complete staff profile information
          </Typography>

          {/* Personal Info */}
          <Typography fontWeight={700} mb={1}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Staff Name" value={staffMember.staffName} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Email ID" value={staffMember.emailId} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Phone Number" value={staffMember.phoneNumber} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Gender" value={staffMember.gender} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Date of Birth" value={staffMember.dateOfBirth} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="City" value={staffMember.cityName} />
            </Grid>
          </Grid>

          {/* Professional Info */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Professional Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Role" value={staffMember.roleName} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Department" value={staffMember.department || "-"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Experience (Years)" value={staffMember.experience} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Joining Date" value={staffMember.joiningDate} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Salary" value={`₹${staffMember.salary || "-"}`} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Status" value={staffMember.status} />
            </Grid>
          </Grid>

          {/* Address Info */}
          <Typography fontWeight={700} mt={5} mb={1}>
            Address Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoItem label="Address Line 1" value={staffMember.addressLine1} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem label="Address Line 2" value={staffMember.addressLine2 || "-"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="State" value={staffMember.stateName} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Country" value={staffMember.countryName} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoItem label="Pincode" value={staffMember.pincode} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StaffDetails;
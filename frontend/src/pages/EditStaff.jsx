import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editStaff, fetchStaff } from "../redux/slices/staffSlice";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { staff, loading } = useSelector((state) => state.staff);

  const existingStaff = staff.find((s) => s.id === id);

  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    cityName: "",
    state: "",
    pincode: "",
    adharCard: "",
    panCard: "",
    address: "",
    yearsOfExperience: "",
    skills: "",
    dateOfJoining: "",
  });

  // Fetch staff if page refreshed
  useEffect(() => {
    if (!staff.length) {
      dispatch(fetchStaff());
    }
  }, [dispatch, staff.length]);

  // Fill form once staff loaded
  useEffect(() => {
    if (existingStaff) {
      setFormData(existingStaff);
    }
  }, [existingStaff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStaff({ ...formData, id }));
    navigate("/staff/list");
  };

  if (loading || !existingStaff) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>
        Edit Staff
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap={2}>

              <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
              <TextField label="Email" name="email" value={formData.emailId} onChange={handleChange} />
              <TextField label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              <TextField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
              <TextField type="date" label="DOB" name="dob" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} />
              <TextField label="City" name="city" value={formData.cityName} onChange={handleChange} />
              <TextField label="State" name="state" value={formData.state} onChange={handleChange} />
              <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
              <TextField label="Aadhar" name="aadhar" value={formData.adharCard} onChange={handleChange} />
              <TextField label="PAN" name="pan" value={formData.panCard} onChange={handleChange} />
              <TextField label="Experience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
              <TextField label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
              <TextField type="date" label="Date of Joining" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true }} />

              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{ gridColumn: "1 / -1" }}
              />
            </Box>

            <Box mt={3} display="flex" gap={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate("/staff/list")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditStaff;
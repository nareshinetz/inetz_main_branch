import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/slices/courseSlice";

/* Common Input Style */
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    minHeight: 56,
  },
};

const instructorOptions = [
  "John Doe",
  "Vijay Kumar",
  "Priya Sharma",
  "Raj Patel",
];

const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.course);

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    totalFee: "",
    instructor: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(addCourse(formData)).unwrap();
      setSuccess(true);
      setTimeout(() => navigate("/courses/list"), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <Alert severity="success" sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        Course Added Successfully!
      </Alert>
    );
  }

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        Add New Course
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <SchoolIcon color="primary" fontSize="large" />
            <Typography variant="h6" fontWeight={600}>
              Course Information
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Grid Layout */}
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Course Name *"
                  name="courseName"
                  fullWidth
                  value={formData.courseName}
                  onChange={handleChange}
                  error={errors.courseName}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Course ID *"
                  name="courseCode"
                  fullWidth
                  value={formData.courseCode}
                  onChange={handleChange}
                  error={errors.courseCode}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Course Fees *"
                  name="totalFee"
                  type="number"
                  fullWidth
                  value={formData.totalFee}
                  onChange={handleChange}
                  error={errors.totalFee}
                  sx={inputStyle}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label="Trainer Name *"
                  name="instructor"
                  fullWidth
                  value={formData.instructor}
                  onChange={handleChange}
                  error={errors.instructor}
                  sx={{width : 190}}
                >
                  {instructorOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Duration (Months) *"
                  name="duration"
                  type="number"
                  fullWidth
                  value={formData.duration}
                  onChange={handleChange}
                  error={errors.duration}
                  sx={inputStyle}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button
                variant="outlined"
                onClick={() => navigate("/courses/list")}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCourse;

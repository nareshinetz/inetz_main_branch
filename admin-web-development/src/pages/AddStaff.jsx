import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import CustomInput from "../generic/Input";
import CustomButton from "../generic/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "white",
    minHeight: 56,
    "& fieldset": {
      borderColor: "grey.300",
      borderWidth: 1.5,
    },
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontSize: "0.95rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
    padding: "16.5px 14px",
  },
  "& .MuiSelect-select": {
    paddingTop: "16.5px",
    paddingBottom: "16.5px",
  },
};

const selectProps = {
  MenuProps: {
    PaperProps: {
      sx: {
        maxHeight: 300,
        mt: 1,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        borderRadius: 2,
        "& .MuiMenuItem-root": {
          fontSize: "0.95rem",
          py: 1.5,
          px: 2,
          "&:hover": {
            bgcolor: "primary.50",
          },
          "&.Mui-selected": {
            bgcolor: "primary.100",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "primary.200",
            },
          },
        },
      },
    },
  },
};

const AddStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffName: "",
    emailId: "",
    phoneNumber: "",
    cityName: "",
    degree: "",
    aadharCard: "",
    panCard: "",
    roleName: "",
    skills: "",
    joiningDate: "",
    salary: "",
    originalCertificate: "",
  });

  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const roleRes = await axios.get("http://localhost:8080/roles");
        const skillRes = await axios.get("http://localhost:8080/courses");
        setRoles(roleRes.data);
        setSkills(skillRes.data);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const requiredFields = Object.keys(formData);
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/staff", formData);
      setShowSuccess(true);
      setTimeout(() => navigate("/staff/list"), 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to add staff");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (showSuccess)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Alert severity="success">
          Staff Added Successfully! Redirecting...
        </Alert>
      </Box>
    );

  return (
    <Box sx={{ mb: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 1,
            background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Add New Staff Member
        </Typography>
      </Box>

      {/* CARD */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            {/* Section Header */}
            {/* <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "primary.main", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Staff Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill all fields to complete staff registration
                </Typography>
              </Box>
            </Box> */}

            {/* 3-COLUMN GRID */}
            {/* 3-COLUMN GRID */}
<Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>
  {/* COLUMN 1 */}
  <Grid item xs={12} md={4} sx={{ width: '30%' }}>
    <Stack spacing={3}>
      <TextField
        sx={inputStyle}
        fullWidth
        label="Full Name"
        name="staffName"
        value={formData.staffName}
        onChange={handleChange}
        error={errors.staffName}
        required
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        required
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="Aadhar Card"
        name="aadharCard"
        value={formData.aadharCard}
        onChange={handleChange}
        error={errors.aadharCard}
        required
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="City"
        name="cityName"
        value={formData.cityName}
        onChange={handleChange}
        error={errors.cityName}
        required
      />
    </Stack>
  </Grid>

  {/* COLUMN 2 */}
  <Grid item xs={12} md={4} sx={{ width: '30%' }}>
    <Stack spacing={3}>
      <TextField
        sx={inputStyle}
        fullWidth
        label="Email Address"
        name="emailId"
        type="email"
        value={formData.emailId}
        onChange={handleChange}
        error={errors.emailId}
        required
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="PAN Card"
        name="panCard"
        value={formData.panCard}
        onChange={handleChange}
        error={errors.panCard}
        required
      />
      <TextField
        sx={inputStyle}
        select
        fullWidth
        label="Role"
        name="roleName"
        value={formData.roleName}
        onChange={handleChange}
        error={errors.roleName}
        required
        SelectProps={selectProps}
      >
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.name}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={inputStyle}
        fullWidth
        label="Highest Degree"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        error={errors.degree}
        required
      />
    </Stack>
  </Grid>

  {/* COLUMN 3 */}
  <Grid item xs={12} md={4} sx={{ width: '30%' }}>
    <Stack spacing={3}>
      <TextField
        sx={inputStyle}
        select
        fullWidth
        label="Skills"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        error={errors.skills}
        required
        SelectProps={selectProps}
      >
        {skills.map((skill) => (
          <MenuItem key={skill.id} value={skill.name}>
            {skill.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={inputStyle}
        fullWidth
        type="date"
        label="Joining Date"
        name="joiningDate"
        value={formData.joiningDate}
        onChange={handleChange}
        error={errors.joiningDate}
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="Monthly Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        error={errors.salary}
        required
      />
      <TextField
        sx={inputStyle}
        fullWidth
        label="Original Certificate"
        name="originalCertificate"
        value={formData.originalCertificate}
        onChange={handleChange}
        error={errors.originalCertificate}
        required
        rows={3}
      />
    </Stack>
  </Grid>
</Grid>


            {/* Buttons centered like Student form */}
            <Box sx={{ mt: 4 , width:"95%" }} >
              <Grid container justifyContent="right">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection:"row-reverse",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <CustomButton
                      type="submit"
                      label="SAVE"
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        boxShadow: "0 8px 24px rgba(25,118,210,0.35)",
                        fontWeight: 700,
                        "&:hover": {
                          boxShadow: "0 12px 32px rgba(25,118,210,0.45)",
                        },
                      }}
                    />
                    <CustomButton
                      variant="outlined"
                      color="error"
                      label="Cancel"
                      onClick={() => navigate("/staff/list")}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        borderWidth: 2,
                        fontWeight: 600,
                        "&:hover": {
                          borderWidth: 2,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddStaff;

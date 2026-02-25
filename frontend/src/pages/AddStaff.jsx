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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../generic/Button";
import { addStaff, resetStaffSuccess } from "../redux/slices/staffSlice";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "white",
  },
};

const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.staff);

  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    staffName: "",
    emailId: "",
    phoneNumber: "",
    cityName: "",
    degree: "",
    adharCard: "",
    panCard: "",
    roleName: "",
    skills: "",
    joiningDate: "",
    salary: "",
    originalCertification: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const requiredFields = [
      "staffName",
      "emailId",
      "phoneNumber",
      "cityName",
      "degree",
      "adharCard",
      "panCard",
      "roleName",
      "skills",
      "joiningDate",
      "salary",
      "originalCertification",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(addStaff(formData)).unwrap();
          console.log("Sending Data:", formData);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SUCCESS REDIRECT ================= */
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetStaffSuccess());
        navigate("/staff/list");
      }, 1500);
    }
  }, [success, dispatch, navigate]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Add New Staff Member
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Staff Added Successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* COLUMN 1 */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>
                  <TextField
                    sx={inputStyle}
                    label="Full Name"
                    name="staffName"
                    value={formData.staffName}
                    onChange={handleChange}
                    error={errors.staffName}
                    fullWidth
                  />
                  <TextField
                    sx={inputStyle}
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    fullWidth
                  />
                  <TextField
                    sx={inputStyle}
                    label="Aadhar Card"
                    name="adharCard"
                    value={formData.adharCard}
                    onChange={handleChange}
                    error={errors.adharCard}
                    fullWidth
                  />
                  <TextField
                    sx={inputStyle}
                    label="City"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                    error={errors.cityName}
                    fullWidth
                  />
                </Stack>
              </Grid>

              {/* COLUMN 2 */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>
                  <TextField
                    sx={inputStyle}
                    label="Email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    error={errors.emailId}
                    fullWidth
                  />
                  <TextField
                    sx={inputStyle}
                    label="PAN Card"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    error={errors.panCard}
                    fullWidth
                  />
                  <TextField
                    label="Role"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleChange}
                    error={errors.roleName}
                    fullWidth
                  />
                  <TextField
                    label="Highest Degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    error={errors.degree}
                    fullWidth
                  />
                </Stack>
              </Grid>

              {/* COLUMN 3 */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>
                  <TextField
                    label="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    error={errors.skills}
                    fullWidth
                  />
                  <TextField
                    type="date"
                    label="Joining Date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    error={errors.joiningDate}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label="Salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    error={errors.salary}
                    fullWidth
                  />
                  <TextField
                    label="Original Certificate"
                    name="originalCertification"
                    value={formData.originalCertification}
                    onChange={handleChange}
                    error={errors.originalCertification}
                    fullWidth
                  />
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        height: '100%',
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 2,
                        justifyContent: "center"
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => navigate("/staff/list")}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          boxShadow: "0 8px 24px rgba(25,118,210,0.35)",
                          fontWeight: 700,
                          "&:hover": {
                            boxShadow: "0 12px 32px rgba(25,118,210,0.45)",
                          },
                        }}
                      >
                        { "SAVE"}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        fullWidth
                        
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          borderWidth: 2,
                          fontWeight: 600,
                          "&:hover": {
                            borderWidth: 2,
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>

            
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddStaff;
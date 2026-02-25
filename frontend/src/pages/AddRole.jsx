import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Alert,
} from "@mui/material";
import { addRole } from "../redux/slices/roleSlice";

// Only the five fields
const permissionsList = [
  "Student Management",
  "Price Management",
  "Lead Management",
  "Staff Management",
  "Generate Certificate",
];

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roleName: "",
    permissions: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (perm) => {
    setFormData((prev) => {
      const updatedPermissions = prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  // Map the five permissions to backend fields
  const mapPermissionsToPayload = () => ({
    role: formData.roleName,
    studentManagement: formData.permissions.includes("Student Management"),
    staffManagement: formData.permissions.includes("Staff Management"),
    priceManagement: formData.permissions.includes("Price Management"),
    leadManagement: formData.permissions.includes("Lead Management"),
    generateCertificate: formData.permissions.includes("Generate Certificate"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roleName.trim()) {
      setError("Role Name is required");
      return;
    }

    setError("");

    const payload = mapPermissionsToPayload();

    try {
      await dispatch(addRole(payload)).unwrap();
      navigate("/roles/list");
    } catch (err) {
      setError(err || "Failed to create role");
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Add New Role
      </Typography>

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
            <Grid container spacing={3}>
              {/* Role Name */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Role Name"
                  name="roleName"
                  fullWidth
                  value={formData.roleName}
                  onChange={handleChange}
                />
              </Grid>

              {/* Permissions */}
              <Grid item xs={12}>
                <Typography fontWeight={600} mb={1}>
                  Assign Permissions
                </Typography>
                <FormGroup>
                  <Grid container spacing={1}>
                    {permissionsList.map((perm) => (
                      <Grid item xs={12} sm={6} md={4} key={perm}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.permissions.includes(perm)}
                              onChange={() => handlePermissionChange(perm)}
                            />
                          }
                          label={perm}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: '100%',
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: 2,
                    justifyContent: "right"
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
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
                    {"SAVE"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="error"
                    fullWidth
                    onClick={() => navigate("/payments/add")}
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
            </Grid>
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

export default AddRole;
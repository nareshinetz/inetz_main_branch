import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Stack,
  Divider,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRoles } from "../redux/slices/roleSlice";
import { createUser } from "../redux/slices/userSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roles, loading } = useSelector((state) => state.roles);

  // ✅ Default values
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "", // will store selected role ID
  });

  const [error, setError] = useState("");

  // ✅ Fetch roles when page loads
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // ✅ Set default role when roles are loaded
  useEffect(() => {
    if (roles.length > 0 && !formData.role
    ) {
      setFormData((prev) => ({
        ...prev,
        role: roles[0].id, // first role as default
      }));
    }
  }, [roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.username || !formData.password) {
    setError("All fields are required");
    return;
  }

  setError("");

  const payload = {
    name: formData.name,
    username: formData.username,
    password: formData.password,
    role: Number(formData.role), // 🔥 convert to number
  };

  console.log("Sending Payload:", payload);

  const resultAction = await dispatch(createUser(payload));

  if (createUser.fulfilled.match(resultAction)) {
    navigate("/user/list");
  } else {
    setError(resultAction.payload || "Failed to create user");
  }
};

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New User
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>

              {/* Full Name */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>

              {/* Role Dropdown */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Assign Role"
                  name="role"
                  select
                  fullWidth
                  value={formData.role}
                  onChange={handleChange}
                >
                  {loading ? (
                    <MenuItem value="">
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.role}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Box
                  sx={{
                    width : "100%",
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
                    onClick={() => navigate("/user/list")}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddUser;
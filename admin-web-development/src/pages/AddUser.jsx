import React from "react";
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
} from "@mui/material";

const AddUser = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New User
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Full Name" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Email" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Password" type="password" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Assign Role"
                select
                fullWidth
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Trainer">Trainer</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
              >
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
                <Button variant="contained">
                  Save
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddUser;
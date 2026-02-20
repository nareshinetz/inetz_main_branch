import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Divider,
} from "@mui/material";

const permissionsList = [
  "Add Student",
  "Edit Student",
  "Delete Student",
  "View Reports",
  "Manage Courses",
];

const AddRole = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New Role
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Role Name */}
            <Grid item xs={12} md={6}>
              <TextField label="Role Name" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Permissions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Assign Permissions
              </Typography>

              <FormGroup>
                <Grid container spacing={2}>
                  {permissionsList.map((perm) => (
                    <Grid item xs={12} sm={6} md={4} key={perm}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={perm}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>

            {/* Buttons */}
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

export default AddRole;
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeIcon from "@mui/icons-material/Home";

const ListUsers = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <HomeIcon fontSize="small" />
          <Typography variant="body2">Dashboard</Typography>
        </Stack>
        <Typography variant="body2" color="text.primary">
          Users
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage system users
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Divider sx={{ mb: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontWeight={600}>
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                john@email.com
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <IconButton color="error">
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListUsers;
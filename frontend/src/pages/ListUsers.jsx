import React, { useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CommonAgGrid from "../generic/AgGridTable";
import { fetchUsers, deleteUser } from "../redux/slices/userSlice";

const selectUsersData = (state) => state.user;

const ListUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(selectUsersData);

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* ================= HANDLERS ================= */

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(id));
      }
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/user/edit/${id}`);
    },
    [navigate]
  );

  const handleView = useCallback(
    (id) => {
      navigate(`/user/view/${id}`);
    },
    [navigate]
  );

  /* ================= COLUMNS ================= */

  const userColumns = useMemo(
    () => [
      {
        headerName: "User ID",
        field: "id",
        cellRenderer: (params) => (
          <Link
            component="button"
            underline="none"
            sx={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontWeight: 500,
            }}
            onClick={() => handleView(params.value)}
          >
            {params.value}
          </Link>
        ),
      },
      {
        headerName: "Username",
        field: "username",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Role",
        field: "role",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Actions",
        width: 140,
        cellRenderer: (params) => {
          if (!params?.data?.id) return null;

          return (
            <Box display="flex" gap={1}>
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleEdit(params.data.id)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                size="small"
                onClick={() => handleDelete(params.data.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [handleEdit, handleDelete, handleView]
  );

  /* ================= STATES ================= */

  if (loading && users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error && users.length === 0) {
    return (
      <Alert severity="error">
        Failed to load users: {error}
      </Alert>
    );
  }

  if (!users.length) {
    return <Alert severity="info">No users found.</Alert>;
  }

  /* ================= RENDER ================= */

  return (
    <Box>
      {loading && users.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Refreshing user list...
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="right" mb={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/user/add")}
            >
              Add User
            </Button>
          </Box>

          <CommonAgGrid
            rowData={users}
            columnDefs={userColumns}
            loadingMessage="Fetching users..."
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListUsers;
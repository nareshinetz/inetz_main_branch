import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import CommonAgGrid from "../generic/AgGridTable"; // your AgGrid wrapper
import { deleteRole, fetchRoles } from "../redux/slices/roleSlice";

const selectRolesData = (state) => state.roles;

const ListRoles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector(selectRolesData);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  /* ================= HANDLERS ================= */

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      dispatch(deleteRole(id));
    }
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    navigate(`/roles/edit/${id}`);
  }, [navigate]);

  const handleView = useCallback((id) => {
    navigate(`/roles/view/${id}`);
  }, [navigate]);

  /* ================= FILTER ================= */

  const filteredRoles = useMemo(() => {
    if (!Array.isArray(roles)) return [];

    const search = searchQuery.toLowerCase();

    return roles.filter((r) =>
      (r.role || "").toLowerCase().includes(search)
    );
  }, [roles, searchQuery]);

  /* ================= COLUMNS ================= */

  const roleColumns = useMemo(
    () => [
      {
        headerName: "Role ID",
        field: "id",
        cellRenderer: (params) => (
          <Link
            component="button"
            underline="none"
            sx={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationThickness: "1.5px",
              fontWeight: 500,
            }}
            onClick={() => handleView(params.value)}
          >
            {params.value}
          </Link>
        ),
      },
      { headerName: "Role Name", field: "role", sortable: true, filter: true },
      {
        headerName: "Permissions",
        field: "permissions",
        width: 350,
        valueGetter: (params) => {
          const perms = [];
          if (params.data.studentManagement) perms.push("Student");
          if (params.data.staffManagement) perms.push("Staff");
          if (params.data.priceManagement) perms.push("Price");
          if (params.data.leadManagement) perms.push("Lead");
          if (params.data.generateCertificate) perms.push("Generate Certificate");
          return perms.join(", ");
        },
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

  /* ================= LOADING & ERROR ================= */

  if (loading && filteredRoles.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error && filteredRoles.length === 0) {
    return (
      <Alert severity="error" sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        Failed to load roles: {typeof error === "string" ? error : String(error)}
      </Alert>
    );
  }

  if (!filteredRoles.length) {
    return (
      <Alert severity="info">
        {searchQuery
          ? "No roles found matching your search."
          : "No roles found."}
      </Alert>
    );
  }

  /* ================= RENDER ================= */

  return (
    <Box>

      {loading && filteredRoles.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Refreshing role list...
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="right" mb={2} flexWrap="wrap" gap={3}>
          <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/students/add")}
            >
              Add
            </Button>
            </Box>
          <CommonAgGrid
            rowData={filteredRoles}
            columnDefs={roleColumns}
            loadingMessage="Fetching roles..."
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListRoles;
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, deleteStaff } from "../redux/slices/staffSlice";
import { Link, useNavigate } from "react-router-dom";
import CommonAgGrid from "../generic/AgGridTable";

const selectStaffData = (state) => state.staff;

const ListStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector(selectStaffData);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  /* ================= HANDLERS ================= */

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      dispatch(deleteStaff(id));
    }
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    navigate(`/staff/edit/${id}`);
  }, [navigate]);

  const handleView = useCallback(
      (id) => navigate(`/students/view/${id}`),
      [navigate]
    );

  /* ================= FILTER ================= */

  const filteredStaff = useMemo(() => {
    if (!Array.isArray(staff)) return [];

    const search = searchQuery.toLowerCase();

    return staff.filter((member) => (
      (member.staffName || "").toLowerCase().includes(search) ||
      (member.emailId || "").toLowerCase().includes(search) ||
      (member.phoneNumber || "").toLowerCase().includes(search) ||
      (member.skills || "").toLowerCase().includes(search)
    ));
  }, [staff, searchQuery]);

  /* ================= COLUMNS ================= */

  const staffColumns = useMemo(
    () => [
    {
      headerName: "Staff ID",
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
            onClick={() => handleView(params.value.id)}
          >
            {params.value} {/* use params.value, not params.data */}
          </Link>
      ),
    },
    { headerName: "Full Name", field: "staffName", sortable: true, filter: true },
    { headerName: "Email", field: "emailId", filter: true },
    { headerName: "Phone", field: "phoneNumber" },
    { headerName: "City", field: "cityName", filter: true },
    {
      headerName: "Joining Date",
      field: "joiningDate",
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleDateString() : "",
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
  ], [handleEdit, handleDelete]);

  /* ================= LOADING ================= */

  if (loading && filteredStaff.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error && filteredStaff.length === 0) {
    return (
      <Alert severity="error" sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        Failed to load staff: {error}
      </Alert>
    );
  }

  if (!filteredStaff.length) {
    return (
      <Alert severity="info">
        {searchQuery
          ? "No staff members found matching your search."
          : "No staff members found."}
      </Alert>
    );
  }

  /* ================= RENDER ================= */

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Staff Members
      </Typography>

      {loading && filteredStaff.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Refreshing staff list...
        </Alert>
      )}

      <Card>
        <CardContent>
          <CommonAgGrid
            rowData={filteredStaff}
            columnDefs={staffColumns}
            loadingMessage="Fetching staff details..."
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListStaff;
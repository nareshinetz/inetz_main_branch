import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, deleteStaff } from "../redux/slices/staffSlice";
import { useNavigate } from "react-router-dom";
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      dispatch(deleteStaff(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/staff/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/staff/view/${id}`);
  };

 const filteredStaff = useMemo(() => {
  if (!Array.isArray(staff)) return [];

  const search = searchQuery.toLowerCase();

  return staff.filter((member) => (
    (member.fullName || "").toLowerCase().includes(search) ||
    (member.emailId || "").toLowerCase().includes(search) ||
    (member.phoneNumber || "").toLowerCase().includes(search) ||
    (member.skills || "").toLowerCase().includes(search)
  ));
}, [staff, searchQuery]);


  const staffColumns = useMemo(
    () => [
      { headerName: "Full Name", field: "fullName", sortable: true, filter: true },
      { headerName: "Email", field: "emailId", filter: true },
      { headerName: "Phone", field: "phoneNumber" },
      { headerName: "City", field: "cityName", filter: true },
      {
        headerName: "Experience",
        field: "yearsOfExperience",
        valueFormatter: (p) =>
          p.value ? `${p.value} ${p.value === "1" ? "year" : "years"}` : "",
      },
      { headerName: "Skills", field: "skills", filter: true },
      {
        headerName: "Date of Joining",
        field: "dateOfJoining",
        valueFormatter: (p) =>
          p.value ? new Date(p.value).toLocaleDateString() : "",
      },
      {
        headerName: "Actions",
        cellRenderer: (params) => (
          <div>
            <button
              style={{ marginRight: 8 }}
              onClick={() => handleView(params.data.id)}
            >
              View
            </button>
            <button
              style={{ marginRight: 8 }}
              onClick={() => handleEdit(params.data.id)}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(params.data.id)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

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
import React, { useEffect, useMemo, useState } from "react";
import { Box, Alert, CircularProgress, IconButton } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLeads,
  deleteLead,
  resetStatus,
} from "../redux/slices/leadsSlice";
import { myTheme } from "../generic/AgGridTheme";
import { Delete, Edit } from "@mui/icons-material";

ModuleRegistry.registerModules([AllCommunityModule]);

const ListLead = () => {
  const dispatch = useDispatch();
  const { leads, loading, error, success } = useSelector(
    (state) => state.leads
  );

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(resetStatus()), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
      resizable: true,
    }),
    []
  );

  const [colDefs] = useState([
    { headerName: "Student Name", field: "studentName" },
    { headerName: "Email ID", field: "emailId" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Program Type", field: "programType" },
    { headerName: "Course", field: "course" },
    { headerName: "Source", field: "source" },
    { headerName: "City", field: "city" },
    { headerName: "Degree", field: "degree" },
    { headerName: "College Name", field: "collegeName" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Reminder Date",
      field: "reminderDate",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    { headerName: "Comments", field: "comments" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.data)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.data)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
      width: 120,
      filter: false,
      sortable: false,
      suppressMenu: true,
    },
  ]);

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Example future step:
    // navigate(`/leads/edit/${row.id}`, { state: row });
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.studentName}?`)) {
      dispatch(deleteLead(row.id));
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        Failed to load leads: {error}
      </Alert>
    );
  }

  if (!leads.length) {
    return <Alert severity="info">No leads found.</Alert>;
  }

  return (
    <Box sx={{ height: { xs: "70vh", md: "80vh" }, width: "100%" }}>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Operation completed successfully!
        </Alert>
      )}
      <AgGridReact
        theme={myTheme}
        rowData={leads}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10]}
      />
    </Box>
  );
};

export default ListLead;

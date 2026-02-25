import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Link,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  searchStudents,
  deleteStudent,
} from "../redux/slices/studentSlice";
import AgGridTable from "../generic/AgGridTable";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DownloadDropdown from "../generic/DropDown";

const ListStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error, totalPages } = useSelector(
    (state) => state.students
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  // Initial fetch + Debounced search
  useEffect(() => {
    const term = searchTerm.trim();

    if (term.length < 2) {
      dispatch(fetchStudents({ page: (page - 1) || 1, size }));
      return;
    }

    const debounce = setTimeout(() => {
      dispatch(searchStudents(term));
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Delete student
  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
        dispatch(deleteStudent(id)).then(() => {
          const newPage =
            students.length === 1 && page > 1 ? page - 1 : page;
          setPage(newPage);
          dispatch(fetchStudents({ page: newPage - 1, size }));
        });
      }
    },
    [dispatch, students.length, page, size]
  );

  // Navigate to edit
  const handleEdit = useCallback(
    (id) => navigate(`/students/edit/${id}`),
    [navigate]
  );

  // Navigate to view
  const handleView = useCallback(
    (id) => navigate(`/students/view/${id}`),
    [navigate]
  );

  // Table columns
  const studentColumns = useMemo(
    () => [
      {
        headerName: "Student ID",
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
      { headerName: "Name", field: "studentName", sortable: true, filter: true },
      { headerName: "Phone", field: "phoneNumber" },
      { headerName: "Program", field: "programType", filter: true },
      { headerName: "Total Fees", field: "studentFees.totalFees", filter: true },
      { headerName: "Paid Fees", field: "studentFees.paidAmount", filter: true },
      { headerName: "Status", field: "studentFees.status", filter: true },
      {
        headerName: "Actions",
        width: 140,
        cellRenderer: (params) => (
          <Box display="flex" gap={1}>
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.data.id)}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.data.id)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleEdit, handleDelete, handleView]
  );

  const downloadColumns = useMemo(
    () => [
      { header: "Name", key: "studentName", width: 25 },
      { header: "Email", key: "emailId", width: 30 },
      { header: "Phone", key: "phoneNumber", width: 15 },
      { header: "Program", key: "programType", width: 20 },
      { header: "Total Fees", key: "totalFees", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ],
    []
  );

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

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="right" mb={2} flexWrap="wrap" gap={3}>
          {/* <Typography variant="h4">Students List</Typography> */}
          <TextField
            size="small"
            placeholder="Search student by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{ width: 280 }}
          />
          <Box display="flex" gap={2}>
            <DownloadDropdown
              data={students}
              columns={downloadColumns}
              fileName="students_list"
              sheetName="Students"
              title="STUDENTS LIST REPORT"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/students/add")}
            >
              Add
            </Button>
          </Box>
        </Box>



        <AgGridTable
          rowData={students || []}
          columnDefs={studentColumns}
          loadingMessage="Fetching students..."
        />

        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      </CardContent>
    </Card>
  );
};

export default ListStudents;

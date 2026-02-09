import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/slices/studentSlice";
import AgGridTable from "../generic/AgGridTable";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import DownloadDropdown from "../generic/DropDown";


const ListStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEdit = (id) => {
    console.log("Edit student:", id);
    navigate(`/students/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/students/view/${id}`)
    }

  const studentColumns = useMemo(
    () => [
      {
  headerName: "Student ID",
  field: "id",
  cellRenderer: (params) => (
    <Link
      component="button"
      underline="hover"
      sx={{
        fontWeight: 600,
        cursor: "pointer",
      }}
      onClick={() => handleView(params.value)}
    >
      {params.value}
    </Link>
  ),
},

      { headerName: "Name", field: "studentName", sortable: true, filter: true },
      { headerName: "Email", field: "emailId", filter: true },
      { headerName: "Phone", field: "phoneNumber" },
      { headerName: "Program", field: "programType", filter: true },
      { headerName: "Status", field: "status", filter: true },
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
    []
  );

  const downloadColumns = useMemo(
    () => [
      { header: "Name", key: "studentName", width: 25 },
      { header: "Email", key: "emailId", width: 30 },
      { header: "Phone", key: "phoneNumber", width: 15 },
      { header: "Program", key: "programType", width: 20 },
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

  if (error) {
    return (
      <Alert severity="error" sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        Failed to load students: {error}
      </Alert>
    );
  }

  return (
   

      <Card>
        <CardContent>
           <Box display={"flex"} justifyContent={"space-between"} marginBottom={2}>
      <Typography variant="h4" >
        Students List
      </Typography>

     <Box display="flex" gap={2}>
      <DownloadDropdown
        
  data={students}
  columns={downloadColumns}
  fileName="students_list"
  sheetName="Students"
  title="STUDENTS LIST REPORT"
/>
            <Button
      variant= "contained"
        color = "primary"
        onClick={()=>navigate("/students/add")}
      >Add Student</Button>
     </Box>
          </Box>
          <AgGridTable
            rowData={students || []}
            columnDefs={studentColumns}
            loadingMessage="Fetching students..."
          />
        </CardContent>
      </Card>

  );
};

export default ListStudents;
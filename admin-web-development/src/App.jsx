import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./theme";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddStaff from "./pages/AddStaff";
import ListStaff from "./pages/ListStaff";
import AddStudent from "./pages/AddStudent";
import ListStudents from "./pages/ListStudents";
import Login from "./pages/Login";
import AddLeads from "./pages/AddLeads";
import ListLead from "./pages/ListLead";
import StudentDetails from "./pages/StudentDetails";
import AddPayment from "./pages/AddPayment";
import EditStaff from "./pages/EditStaff";
import AddCourse from "./pages/AddCourse";

import TransactionHistory from "./pages/TransactionHistory";
import TransactionDetails from "./pages/ViewTransactions";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff/add" element={<AddStaff />} />
            <Route path="/staff/list" element={<ListStaff />} />
            <Route path="/staff/view/:id" element={<ListStaff />} />
            <Route path="/staff/edit/:id" element={<EditStaff />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/list" element={<ListStudents />} />
            <Route path="/students/edit/:id" element={<AddStudent />} />
            <Route path="/students/view/:id" element={<StudentDetails />} />
            <Route path="/leads/add" element={<AddLeads />} />
            <Route path="/leads/list" element={<ListLead />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/addpayment" element={<AddPayment />} />
            <Route path="/transactionhistory" element={<TransactionHistory />} />
            <Route path="/transactions/view/:id"element={<TransactionDetails />}/>


          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  List as ListIcon,
  AccountCircle,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import BreadcrumbsNav from "../generic/BreadcrumbsNav";

const drawerWidth = 280;

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [internshipOpen, setInternshipOpen] = useState(false);
  const [transactionOpen,setTransactionOpen] = useState(false) 

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStaffClick = () => {
    setStaffOpen(!staffOpen);
    setStudentsOpen(false);
    setLeadsOpen(false);
  };

  const handleStudentsClick = () => {
    setStudentsOpen(!studentsOpen);
    setStaffOpen(false);
    setLeadsOpen(false);
  };
  const handleLeadsClick = () => {
    setLeadsOpen(!leadsOpen);
    setStaffOpen(false);
    setStudentsOpen(false);
  };

  const handleTransactionClick = () => {
    setTransactionOpen(!transactionOpen);
    setStaffOpen(false);
    setLeadsOpen(false);
    setStudentsOpen(false);
  };

  const handleCourseClick = () => {
    setCourseOpen(!courseOpen);
    setStaffOpen(false);
    setLeadsOpen(false);
    setStudentsOpen(false);
    setTransactionOpen(false)
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // const isActive = (path) => location.pathname === path;
  const isActive = (path) => location.pathname.startsWith(path);

  const drawer = (
    <Box>
      <Toolbar sx={{ ml: 9 }}>
        <img
          src={logo}
          alt="Admin Logo"
          style={{ height: 50, objectFit: "cover" }}
        />
      </Toolbar>

      <Divider sx={{ backgroundColor: "inherit" }} />

      <List>
        {/* Dashboard  */}
        <ListItem disablePadding>
          <ListItemButton
            selected={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: alpha("#ffffff", 0.2),
                "& .MuiListItemIcon-root": { color: "#ffffff" },
              },
              "&:hover": { backgroundColor: alpha("#ffffff", 0.2) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/*  Leads */}
        {/* {(user?.role === "Admin" || user?.role === "Trainer") && ( */}
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLeadsClick}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Leads" />
              {leadsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={leadsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/leads/list")}
                onClick={() => navigate("/leads/list")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="List Leads" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/leads/add")}
                onClick={() => navigate("/leads/add")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Add Leads" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
        {/* )} */}
        {/* Students - */}
        {/* {(user?.role === "Admin" || user?.role === "Trainer") && ( */}
        <>
          {/* Students Section */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleStudentsClick}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
              {studentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Course Submenu */}
              {/* <ListItemButton
                  onClick={() => setCourseOpen(!courseOpen)}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Course" />
                  {courseOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={courseOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      selected={isActive("/students/course/list")}
                      onClick={() => navigate("/students/course/list")}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Students" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      selected={isActive("/students/course/add")}
                      onClick={() => navigate("/students/course/add")}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <PersonAdd />
                      </ListItemIcon>
                      <ListItemText primary="Add Student" />
                    </ListItemButton>
                  </List>
                </Collapse> */}

              {/* Internship Submenu */}
              {/* <ListItemButton
                onClick={() => setInternshipOpen(!internshipOpen)}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Internship" />
                {internshipOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton> */}

              {/* <Collapse in={internshipOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    selected={isActive("/students/internship/list")}
                    onClick={() => navigate("/students/internship/list")}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="List Students" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    selected={isActive("/students/internship/add")}
                    onClick={() => navigate("/students/internship/add")}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <PersonAdd />
                    </ListItemIcon>
                    <ListItemText primary="Add Student" />
                  </ListItemButton>
                </List>
              </Collapse> */}
            </List>
          </Collapse>

          <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/students/list")}
                onClick={() => navigate("/students/list")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/students/add")}
                onClick={() => navigate("/students/add")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
        {/* )} */}

        {/* Staff*/}
        {/* {user?.role === "Admin" && ( */}
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleStaffClick}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Staff" />
              {staffOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={staffOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/staff/list")}
                onClick={() => navigate("/staff/list")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="List Staff" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/staff/add")}
                onClick={() => navigate("/staff/add")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Add Staff" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
        {/* )} */}

         {/*  Transaction */}
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleTransactionClick}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Payment" />
              {transactionOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/addpayment")}
                onClick={() => navigate("/addpayment")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Add Payment" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/transactionhistory")}
                onClick={() => navigate("/transactionhistory")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Transaction History" />
              </ListItemButton>
            </List>
          </Collapse>
        </>

        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCourseClick}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
              {courseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={courseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/addcourse")}
                onClick={() => navigate("/addcourse")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Add Course" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/courselist")}
                onClick={() => navigate("/courselist")}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Course List" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
        
      </List>
    </Box>
  );

  if (location.pathname == "/") {
    return <Outlet />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#121111ff",

          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
          height: 'calc(100vh - 64px)',  // ✅ Add this
          overflowY: 'auto',
        }}
      >
        <BreadcrumbsNav />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

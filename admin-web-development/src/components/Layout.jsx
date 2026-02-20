import React, { useEffect, useState } from "react";
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
  Payment as PaymentIcon,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import BreadcrumbsNav from "../generic/BreadcrumbsNav";

const drawerWidth = 300;

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
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStaffClick = () => {
    setStaffOpen(!staffOpen);
    setCourseOpen(false);
    setStudentsOpen(false);
    setTransactionOpen(false);
  };

  const handleStudentsClick = () => {
    setStudentsOpen(!studentsOpen);
    setCourseOpen(false);
    setTransactionOpen(false);
    setStaffOpen(false);
  };

  const handleLeadsClick = () => {
    setLeadsOpen(!leadsOpen);
    setCourseOpen(false);
    setStudentsOpen(false);
    setTransactionOpen(false);
    setStaffOpen(false);
  };

  const handleTransactionClick = () => {
    setTransactionOpen(!transactionOpen);
    setCourseOpen(false);
    setStudentsOpen(false);
    setStaffOpen(false);
  };

  const handleCourseClick = () => {
    setCourseOpen(!courseOpen);
    setStudentsOpen(false);
    setTransactionOpen(false);
    setStaffOpen(false);
  };

  const handleBatchClick = () => {
  setBatchOpen(!batchOpen);
  setCourseOpen(false);
  setStudentsOpen(false);
  setTransactionOpen(false);
  setStaffOpen(false);
  setLeadsOpen(false);
  };

const handleRoleClick = () => {
  setRoleOpen(!roleOpen)
  setBatchOpen(false);
  setCourseOpen(false);
  setStudentsOpen(false);
  setTransactionOpen(false);
  setStaffOpen(false);
  setLeadsOpen(false);
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

  // Improved isActive function
  const isActive = (path) => {
    // Exact match for dashboard
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    // For students routes, handle both /students/add and /students/edit/:id
    if (path === "/students/add") {
      return location.pathname === "/students/add" ||
        location.pathname.match(/^\/students\/edit\/\d+$/);
    }

    // For all other routes, use startsWith
    return location.pathname.startsWith(path);
  };

  // Auto-expand sections based on current route
  useEffect(() => {
    const path = location.pathname;

    // Close all first
    setStudentsOpen(false);
    setStaffOpen(false);
    setLeadsOpen(false);
    setTransactionOpen(false);
    setCourseOpen(false);

    // Then open the relevant one
    if (path.startsWith("/students")) {
      setStudentsOpen(true);
    } else if (path.startsWith("/staff")) {
      setStaffOpen(true);
    } else if (path.startsWith("/leads")) {
      setLeadsOpen(true);
    } else if (path.startsWith("/payments/add") || path.startsWith("/payments/history")) {
      setTransactionOpen(true);
    } else if (path.startsWith("/courses/add") || path.startsWith("/courses/list")) {
      setCourseOpen(true);
    }else if (path.startsWith("/batches")) {
  setBatchOpen(true);
}

  }, [location.pathname]);

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
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            selected={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: alpha("#ffffff", 0.2),
                "& .MuiListItemIcon-root": { color: "#ffffff" },
              },
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Leads */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLeadsClick}
            sx={{
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Leads Management" />
            {leadsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={leadsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/leads/list")}
              onClick={() => navigate("/leads/list")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="List Leads" />
            </ListItemButton>

            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/leads/add")}
              onClick={() => navigate("/leads/add")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add Lead" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Students */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleStudentsClick}
            sx={{
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Students Management" />
            {studentsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/students/list")}
              onClick={() => navigate("/students/list")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="List Students" />
            </ListItemButton>

            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/students/add")}
              onClick={() => navigate("/students/add")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add Student" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Staff */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleStaffClick}
            sx={{
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Staff Management" />
            {staffOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={staffOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/staff/list")}
              onClick={() => navigate("/staff/list")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="List Staff" />
            </ListItemButton>

            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
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

        {/* Payment */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleTransactionClick}
            sx={{
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments Management" />
            {transactionOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/payments/add")}
              onClick={() => navigate("/payments/add")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add Payment" />
            </ListItemButton>

            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/payments/history")}
              onClick={() => navigate("/payments/history")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Transaction History" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Course */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleCourseClick}
            sx={{
              "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Course Management" />
            {courseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={courseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/courses/add")}
              onClick={() => navigate("/courses/add")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add Course" />
            </ListItemButton>

            <ListItemButton
              sx={{
                pl: 4,
                "&.Mui-selected": {
                  backgroundColor: alpha("#ffffff", 0.2),
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
              }}
              selected={isActive("/courses/list")}
              onClick={() => navigate("/courses/list")}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Course List" />
            </ListItemButton>

            
              </List>
            </Collapse>

            {/* Batch Allocation */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleBatchClick}
                sx={{
                  "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Batch Allocation" />
                {batchOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={batchOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/batches/add")}
                  onClick={() => navigate("/batches/add")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Allocate Batch" />
                </ListItemButton>

                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/batches/list")}
                  onClick={() => navigate("/batches/list")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Batch List" />
                </ListItemButton>

                

          </List>
        </Collapse>
        {/* Role Management */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleRoleClick}
                sx={{
                  "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Role Management" />
                {roleOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={roleOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/role/add")}
                  onClick={() => navigate("/role/add")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Add Role" />
                </ListItemButton>

                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/role/list")}
                  onClick={() => navigate("/role/list")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Role List" />
                </ListItemButton>

                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/user/add")}
                  onClick={() => navigate("/user/add")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Add User" />
                </ListItemButton>

                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: alpha("#ffffff", 0.2),
                      "& .MuiListItemIcon-root": { color: "#ffffff" },
                    },
                    "&:hover": { backgroundColor: alpha("#ffffff", 0.1) },
                  }}
                  selected={isActive("/user/list")}
                  onClick={() => navigate("/user/list")}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="User List" />
                </ListItemButton>

                

          </List>
        </Collapse>
      </List>
    </Box>
  );

  if (location.pathname === "/") {
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
          height: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        <BreadcrumbsNav />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
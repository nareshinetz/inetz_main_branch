import React from "react";
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

// BreadcrumbsNav.jsx

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },

  {
    name: "Leads",
    path: "/leads",
    children: [
      { name: "List Leads", path: "/leads/list" },
      { name: "Add Lead", path: "/leads/add" },
    ],
  },

  {
    name: "Students",
    path: "/students",
    children: [
      { name: "List Students", path: "/students/list" },
      { name: "Add Student", path: "/students/add" },
      { name: "View Student", path: "/students/view" },
    ],
  },

  {
    name: "Staff",
    path: "/staff",
    children: [
      { name: "List Staff", path: "/staff/list" },
      { name: "Add Staff", path: "/staff/add" },
    ],
  },

  {
    name: "Payments",
    path: "/payments",
    children: [
      { name: "Add Payment", path: "/payments/add" },
      { name: "Transaction History", path: "/payments/history" },
    ],
  },

  {
    name: "Course",
    path: "/courses",
    children: [
      { name: "Add Course", path: "/courses/add" },
      { name: "Course List", path: "/courses/list" },
    ],
  },
  {
    name: "Roles",
    path: "/role",
    children: [
      { name: "Add Role", path: "/roles/add" },
      { name: "Role List", path: "/roles/list" },
    ],
  },
];


const findBreadcrumbTrail = (items, currentPath) => {
  for (const item of items) {
    if (currentPath.startsWith(item.path)) {
      if (item.children) {
        const childTrail = findBreadcrumbTrail(item.children, currentPath);
        if (childTrail.length) return [item, ...childTrail];
      }
      return [item];
    }
  }
  return [];
};

const BreadcrumbsNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const trail = findBreadcrumbTrail(menuItems, path);

  return (
    <Box sx={{ mb: 2, mt: 1 }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return isLast ? (
            <Typography
              key={item.path}
              color="#1976d2"
              sx={{ fontWeight: 600 }}
            >
              {item.name}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={item.path}
              key={item.path}
              underline="hover"
              color="inherit"
              sx={{
                fontWeight: 500,
                "&:hover": { color: "#1976d2" },
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;

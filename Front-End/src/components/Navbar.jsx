import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ThemeToggle from "../pages/ThemeToggle";

export default function Navbar({ mode, toggleTheme }) {
  const { currentUser, logout } = useUser();
  console.log("currentUser", currentUser);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    { label: "Home", path: "/landing", roles: [1,2,3] },
    { label: "About", path: "/about", roles: [1,2,3] },
    { label: "Plans", path: "/plans", roles: [1,2,3] },
    { label: "Accounts", path: "/accounts", roles: [2,3] },
    { label: "Transactions", path: "/transactions", roles: [2,3] },
    { label: "FAQ", path: "/FAQ", roles: [2,3] },
    { label: "Manage Users", path: "/manage-users", roles: [1] },
    { label: "Manage Banks", path: "/manage-banks", roles: [1] },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={10}
        sx={{
          background: theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(30, 30, 30, 0.6)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          {currentUser && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{
                mr: 1,
                "&:hover": { bgcolor: theme.palette.primary.light, transition: "0.3s" },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/landing"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            Banking Aggregator
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
            {currentUser ? (
              <Tooltip title={currentUser.userName || currentUser.email}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  {(currentUser.userName || "U").charAt(0)}
                </Avatar>
              </Tooltip>
            ) : (
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { color: theme.palette.primary.main, transition: "0.3s" },
                }}
              >
                Sign in
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backdropFilter: "blur(12px)",
            background:
              theme.palette.mode === "light"
                ? "rgba(255,255,255,0.7)"
                : "rgba(30,30,30,0.7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            borderRadius: "0 20px 20px 0",
          },
        }}
      >
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>BA</Avatar>
            <Box>
              <Typography variant="subtitle1">Banking Aggregator</Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser?.userName || currentUser?.email || "Guest"}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            {items
              .filter((it) => it.roles.includes(currentUser?.roleId))
              .map((it) => (
                <ListItem key={it.label} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={it.path}
                    sx={{
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: theme.palette.primary.light,
                        color: "#fff",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <ListItemText primary={it.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  "&:hover": { bgcolor: theme.palette.error.main, color: "#fff", transition: "0.3s" },
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

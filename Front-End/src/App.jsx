import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { Box, ThemeProvider } from "@mui/material";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import ManageUsers from "./pages/ManageUsers";
import ManageBanks from "./pages/ManageBanks";
import AboutUs from "./pages/AboutUs";
import Plans from "./pages/Plans";
import FAQ from "./pages/FAQ";

import { getTheme } from "./Theme"; // import centralized theme

function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => getTheme(mode), [mode]); // use centralized theme

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
              color: "text.primary",
              transition: "all 0.3s ease",
            }}
          >
            <Navbar mode={mode} toggleTheme={toggleTheme} />

            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/plans" element={<Plans />} />

                <Route
                  path="/accounts"
                  element={
                    <PrivateRoute roles={[2,3]}>
                      <Accounts />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/transactions"
                  element={
                    <PrivateRoute roles={[2,3]}>
                      <Transactions />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/FAQ"
                  element={
                    <PrivateRoute roles={[2,3]}>
                      <FAQ />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/manage-users"
                  element={
                    <PrivateRoute roles={[1]}>
                      <ManageUsers />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/manage-banks"
                  element={
                    <PrivateRoute roles={[1]}>
                      <ManageBanks />
                    </PrivateRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Box>

            <Footer mode={mode} />
          </Box>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

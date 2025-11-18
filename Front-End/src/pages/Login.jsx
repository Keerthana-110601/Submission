// // src/pages/Login.jsx
// import React, { useState } from "react";
// import {
//   Container,
//   Paper,
//   Tabs,
//   Tab,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   FormControlLabel,
//   Checkbox,
//   CssBaseline
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// // Dummy DB
// let usersDB = [
//   { email: "admin@gmail.com", userName: "Admin", roleId: 4, password: "Admin@123" },
//   { email: "bankuser@gmail.com", userName: "BankUser", roleId: 5, password: "Bank@123", accounts: [] },
//   { email: "normaluser@gmail.com", userName: "NormalUser", roleId: 6, password: "Normal@123", accounts: [] }
// ];

// export default function Login({ mode }) {
//   const { setCurrentUser } = useUser();
//   const navigate = useNavigate();
//   const [tab, setTab] = useState(0); // 0 = Existing, 1 = New
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [validatedUser, setValidatedUser] = useState(null);
//   const [formData, setFormData] = useState({});

//   const handleTabChange = (e, newValue) => {
//     setTab(newValue);
//     setEmail("");
//     setPassword("");
//     setValidatedUser(null);
//     setFormData({});
//   };

//   // Existing user login
//   const handleLogin = () => {
//     const user = usersDB.find((u) => u.email === email && u.password === password);
//     if (!user) return alert("Invalid credentials");
//     setCurrentUser(user);
//     if (user.roleId === 4) navigate("/manage-users");
//     else navigate("/accounts");
//   };

//   // New user email validation
//   const handleEmailValidation = () => {
//     const user = usersDB.find((u) => u.email === email);
//     if (!user) return alert("User not registered. Contact admin.");
//     setValidatedUser(user);
//     setFormData({ ...user });
//   };

//   // Submit updated user info
//   const handleCreateUserSubmit = () => {
//     alert(`User ${formData.userName} validated and account ready`);
//     setCurrentUser(validatedUser);
//     if (validatedUser.roleId === 4) navigate("/manage-users");
//     else navigate("/accounts");
//   };

//   return (
//     <Grid
//       container
//       sx={{
//         height: "100vh",
//         background: mode === "light"
//           ? "linear-gradient(135deg, #a8e063, #56ab2f)"
//           : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//       }}
//       alignItems="center"
//       justifyContent="center"
//     >
//       <CssBaseline />
//       <Container maxWidth="sm">
//       <Paper
//   elevation={6}
//   sx={{
//     p: 5,
//     borderRadius: 3,
//     backdropFilter: "blur(20px)",
//     backgroundColor: mode === "light"
//       ? "rgba(255,255,255,0.95)"
//       : "rgba(25,25,25,0.95)",
//     border: mode === "light"
//       ? "1px solid rgba(200,200,200,0.3)"
//       : "1px solid rgba(255,255,255,0.2)",
//     boxShadow: mode === "light"
//       ? "0 8px 32px rgba(0,0,0,0.2)"
//       : "0 8px 32px rgba(0,0,0,0.6)",
//     color: mode === "light" ? "#000" : "#fff",
//   }}
// >


//           <Tabs value={tab} onChange={handleTabChange} centered>
//             <Tab label="Existing User" />
//             <Tab label="New User" />
//           </Tabs>

//           {/* Existing User */}
//           {tab === 0 && (
//             <Box sx={{ mt: 3 }}>
//               <TextField
//   fullWidth
//   label="Email"
//   margin="normal"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   InputProps={{
//     sx: {
//       backgroundColor: mode === "light" ? "#f5f6fa" : "#2c2c2c",
//       color: mode === "light" ? "#000" : "#fff",
//       borderRadius: 1,
//     }
//   }}
//   InputLabelProps={{
//     sx: { color: mode === "light" ? "#555" : "#ccc" }
//   }}
// />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   backgroundColor: "#528F3A",
//                   "&:hover": { backgroundColor: "#3E6F2C", transform: "scale(1.02)", transition: "0.3s" }
//                 }}
//                 onClick={handleLogin}
//               >
//                 Login
//               </Button>
//             </Box>
//           )}

//           {/* New User */}
//           {tab === 1 && (
//             <Box sx={{ mt: 3 }}>
//               {!validatedUser ? (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Enter Email"
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       backgroundColor: "#528F3A",
//                       "&:hover": { backgroundColor: "#3E6F2C", transform: "scale(1.02)", transition: "0.3s" }
//                     }}
//                     onClick={handleEmailValidation}
//                   >
//                     Validate Email
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="h6" mb={2}>
//                     Welcome {validatedUser.userName}! Update your account details below.
//                   </Typography>

//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     margin="normal"
//                     value={formData.userName || ""}
//                     onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     margin="normal"
//                     value={formData.email || ""}
//                     disabled
//                   />
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     type="password"
//                     margin="normal"
//                     value={formData.password || ""}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Date of Birth"
//                     type="date"
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                     value={formData.dateOfBirth || ""}
//                     onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     margin="normal"
//                     value={formData.address || ""}
//                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   />
//                   <TextField
//                     fullWidth
//                     label="PAN"
//                     margin="normal"
//                     value={formData.pan || ""}
//                     onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Aadhar"
//                     margin="normal"
//                     value={formData.aadhar || ""}
//                     onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.isMinor || false}
//                         onChange={(e) => setFormData({ ...formData, isMinor: e.target.checked })}
//                       />
//                     }
//                     label="Is Minor"
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.isNRI || false}
//                         onChange={(e) => setFormData({ ...formData, isNRI: e.target.checked })}
//                       />
//                     }
//                     label="Is NRI"
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.poA_Exists || false}
//                         onChange={(e) => setFormData({ ...formData, poA_Exists: e.target.checked })}
//                       />
//                     }
//                     label="POA Exists"
//                   />
//                   <TextField
//                     fullWidth
//                     label="POA Details"
//                     margin="normal"
//                     value={formData.poA_Details || ""}
//                     onChange={(e) => setFormData({ ...formData, poA_Details: e.target.value })}
//                   />
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       backgroundColor: "#528F3A",
//                       "&:hover": { backgroundColor: "#3E6F2C", transform: "scale(1.02)", transition: "0.3s" }
//                     }}
//                     onClick={handleCreateUserSubmit}
//                   >
//                     Submit
//                   </Button>
//                 </>
//               )}
//             </Box>
//           )}
//         </Paper>
//       </Container>
//     </Grid>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Alert,
} from "@mui/material";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser(); 
  const [role, setRole] = useState("user"); // user | admin
  const [userMode, setUserMode] = useState("signin"); // signin | new
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    dateOfBirth: "",
    address: "",
    PAN: "",
    Aadhar: "",
    isMinor: false,
    isNRI: false,
    POA_Exists: false,
    POA_Details: ""
  });
  

  const handleVerify = async () => {
    if (!email) {
      setMessage("Please enter an email");
      return;
    }
    try {
        const response = await api.get(`/auth/verify-email?email=${encodeURIComponent(email)}`);


      if (response.data.exists) {
        setVerified(true); // show registration card
        setMessage("");
      } else {
        setVerified(false);
        setMessage("No registered account. Contact Admin.");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setVerified(false);
      setMessage("Error verifying email. Try again later.");
    }
  };

  const handleRegister = async () => {
    try {
        // const payload = {
        //     userName: formData.userName,      // required
        //     email: email,                     // required
        //     password: formData.password,      // required
        //     address: formData.address,        // required
        //     PAN: formData.PAN,                // required
        //     Aadhar: formData.Aadhar,          // required
        //     roleId: 3,                        // required: NormalUser
        //     dateOfBirth: formData.dateOfBirth || null,
        //     isMinor: formData.isMinor || false,
        //     isNRI: formData.isNRI || false,
        //     POA_Exists: formData.POA_Exists || false,
        //     POA_Details: formData.POA_Details || null
        //   };
        const payload = {
          userName: formData.userName,
          email: email,                   // prepopulated
          password: formData.password,
          address: formData.address,
          PAN: formData.PAN,
          Aadhar: formData.Aadhar,
          roleId: 3,                      // Normal User
          dateOfBirth: formData.dateOfBirth || null,
          isMinor: formData.isMinor || false,
          isNRI: formData.isNRI || false,
          POA_Exists: formData.POA_Exists || false,
          POA_Details: formData.POA_Details || null
        };
          
          const response = await api.post("/auth/register", payload);
      setUserMode("signin");
      setVerified(false);
      setMessage("Registration successful! Please sign in.");
    } catch (err) {
      console.error(err);
      setMessage("Error creating account.");
    }
  };

  const handleSignin = async () => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password: formData.password,
          });
      localStorage.setItem("token", response.data.token); const userRole = response.data.roleId; // assuming you return roleId in login response
      localStorage.setItem("roleId", userRole);
      //localStorage.setItem("currentUser", JSON.stringify(userData));

      setCurrentUser(response.data.user);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      console.log("the log is", response.data); 



      // Navigate to landing/home page
      navigate("/landing");
      // TODO: navigate to dashboard
    } catch (err) {
      console.error(err);
      setMessage("Invalid credentials.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%", borderRadius: 4, boxShadow: 6, p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {role === "user" ? "User Login" : "Admin Login"}
        </Typography>

        {/* Role Toggle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, val) => val && setRole(val)}
            size="small"
            color="primary"
          >
            <ToggleButton value="user">User</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* User Flow */}
        {role === "user" && (
          <Box>
            {/* User Mode Toggle */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <ToggleButtonGroup
                value={userMode}
                exclusive
                onChange={(e, val) => val && setUserMode(val)}
                size="small"
                color="secondary"
              >
                <ToggleButton value="signin">Sign In</ToggleButton>
                <ToggleButton value="new">New User</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Sign In */}
            {userMode === "signin" && (
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleSignin}
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 600 }}
                >
                  Sign In
                </Button>
                {message && <Alert severity="error">{message}</Alert>}
              </Stack>
            )}

            {/* New User - Email Verification */}
            {userMode === "new" && !verified && (
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleVerify}
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 600 }}
                >
                  Verify Email
                </Button>
                {message && <Alert severity="info">{message}</Alert>}
              </Stack>
            )}

            {/* Registration Form */}
            {userMode === "new" && verified && (
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Username"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="PAN"
                  value={formData.PAN}
                  onChange={(e) => setFormData({ ...formData, PAN: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Aadhar"
                  value={formData.Aadhar}
                  onChange={(e) => setFormData({ ...formData, Aadhar: e.target.value })}
                  fullWidth
                />
                <TextField
  label="Is Minor (true/false)"
  value={formData.isMinor}
  onChange={(e) => setFormData({ ...formData, isMinor: e.target.value === "true" })}
  fullWidth
/>
<TextField
  label="Is NRI (true/false)"
  value={formData.isNRI}
  onChange={(e) => setFormData({ ...formData, isNRI: e.target.value === "true" })}
  fullWidth
/>
<TextField
  label="POA Exists (true/false)"
  value={formData.POA_Exists}
  onChange={(e) => setFormData({ ...formData, POA_Exists: e.target.value === "true" })}
  fullWidth
/>
<TextField
  label="POA Details"
  value={formData.POA_Details}
  onChange={(e) => setFormData({ ...formData, POA_Details: e.target.value })}
  fullWidth
/>

                <Button
                  variant="contained"
                  onClick={handleRegister}
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 600 }}
                >
                  Submit
                </Button>
                {message && <Alert severity="info">{message}</Alert>}
              </Stack>
            )}
          </Box>
        )}

        {/* Admin Flow */}
        {role === "admin" && (
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSignin}
              fullWidth
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Admin Sign In
            </Button>
            {message && <Alert severity="error">{message}</Alert>}
          </Stack>
        )}
      </Card>
    </Box>
  );
}

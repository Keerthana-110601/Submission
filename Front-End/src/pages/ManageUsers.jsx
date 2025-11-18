import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ManageUsers() {
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ userName: "", email: "", roleId: 6 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    alert(`User "${newUser.userName}" created with role ${newUser.roleId}`);
    setNewUser({ userName: "", email: "", roleId: 6 });
    setShowForm(false);
  };

  return (
    <Container sx={{ py: 6 }} maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Manage Users</Typography>
          <Button variant="contained" onClick={() => setShowForm((s) => !s)}>{showForm ? "Cancel" : "Register User"}</Button>
        </Grid>

        {showForm && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" mb={2}>Register New User</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Full Name" name="userName" value={newUser.userName} onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Email" name="email" value={newUser.email} onChange={handleChange} /></Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select name="roleId" value={newUser.roleId} onChange={handleChange} label="Role">
                    <MenuItem value={4}>Admin</MenuItem>
                    <MenuItem value={5}>BankUser</MenuItem>
                    <MenuItem value={6}>NormalUser</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}><Button fullWidth variant="contained" color="success" onClick={handleSubmit}>Submit</Button></Grid>
            </Grid>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" align="center">Subscribe to our newsletter</Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>Get tips & updates</Typography>
      {submitted ? (
        <Typography color="success.main" align="center">Thanks for subscribing!</Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth />
          <Button type="submit" variant="contained">Subscribe</Button>
        </Box>
      )}
    </Paper>
  );
}

import React from "react";
import { Container, Typography, Paper } from "@mui/material";

export default function ManageBanks() {
  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Manage Banks</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Add bank listing, branches and manage connections (scaffold — hook up your APIs here).
        </Typography>
      </Paper>
    </Container>
  );
}

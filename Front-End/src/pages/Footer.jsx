import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer({ mode }) {
  return (
    <Box component="footer" sx={{ mt: "auto", py: 3, bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2">© {new Date().getFullYear()} Banking Aggregator</Typography>
        <Typography variant="caption" color="text.secondary">Made with ♥ — demo app</Typography>
      </Container>
    </Box>
  );
}

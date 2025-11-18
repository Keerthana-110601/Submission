// src/pages/LandingPage.jsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const features = [
  { title: "Accounts Overview", desc: "Check your balances and transactions." },
  { title: "Transfer Money", desc: "Send money securely and instantly." },
  { title: "Plans & Offers", desc: "View the latest savings plans." },
  { title: "Support", desc: "Get assistance anytime." },
];

export default function LandingPage() {
  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #81c784, #66bb6a, #388e3c)",
      }}
    >
      <Typography variant="h4" mb={4} sx={{ color: "#fff", fontWeight: 600 }}>
        Welcome to Banking Aggregator
      </Typography>

      <Grid container spacing={3}>
        {features.map((feat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 3,
                backdropFilter: "blur(12px)",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                p: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 10 },
              }}
            >
              <CardContent>
                <Typography variant="h6" mb={1}>
                  {feat.title}
                </Typography>
                <Typography variant="body2">{feat.desc}</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderColor: "#fff",
                    color: "#fff",
                    "&:hover": { borderColor: "#e0f2f1", color: "#e0f2f1" },
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

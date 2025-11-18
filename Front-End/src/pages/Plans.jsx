import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const plans = [
  { name: "Basic Savings", interestRate: "3.5%", minBalance: "₹1000", features: ["No monthly fees", "Online banking"] },
  { name: "Premium Savings", interestRate: "4.5%", minBalance: "₹10000", features: ["Higher interest", "Free debit card"] },
  { name: "Salary Account", interestRate: "3.0%", minBalance: "₹0", features: ["No min balance", "ATM access"] },
];

export default function Plans() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Our Plans</Typography>
      <Grid container spacing={3}>
        {plans.map((p, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography>Interest: {p.interestRate}</Typography>
                <Typography>Min Balance: {p.minBalance}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>Features</Typography>
                <ul>
                  {p.features.map((f, idx) => <li key={idx}><Typography component="span">{f}</Typography></li>)}
                </ul>
                <Button variant="contained">Choose</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

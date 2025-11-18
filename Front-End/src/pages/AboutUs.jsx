import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const team = [
  { name: "Varsha", role: "Frontend Developer", image: "/team1.jpg" },
  { name: "Ravi", role: "Backend Developer", image: "/team2.jpg" },
  { name: "Sneha", role: "UI/UX Designer", image: "/team3.jpg" },
];

export default function AboutUs() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>About Our Bank</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        We bring all your accounts into a single dashboard with top-grade security.
      </Typography>

      <Typography variant="h5" gutterBottom>Meet the team</Typography>
      <Grid container spacing={3}>
        {team.map((m, idx) => (
          <Grid item sm={6} md={4} key={idx}>
            <Card>
              <CardMedia component="img" height="180" image={m.image} alt={m.name} />
              <CardContent>
                <Typography variant="h6">{m.name}</Typography>
                <Typography color="text.secondary">{m.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import React from "react";
import { Card as MuiCard, CardContent, CardActions, Typography, Button } from "@mui/material";

const Card = ({ title, description, onClick, sx = {} }) => {
  return (
    <MuiCard elevation={3} sx={{ cursor: "pointer", borderRadius: 2, ...sx }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick} variant="contained">Explore</Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;

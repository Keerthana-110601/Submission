import React from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Newsletter from "./Newsletter";

export default function FAQ() {
  return (
    <Container sx={{ py: 6, maxWidth: "md" }}>
      <Typography variant="h4" align="center" gutterBottom>Frequently Asked Questions</Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I open a new bank account?</Typography>
        </AccordionSummary>
        <AccordionDetails><Typography>Open via "Open Account" or visit a branch with identity proof.</Typography></AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What documents are required to open a savings account?</Typography>
        </AccordionSummary>
        <AccordionDetails><Typography>Aadhaar, PAN, photos, address proof (if needed).</Typography></AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I activate internet banking?</Typography>
        </AccordionSummary>
        <AccordionDetails><Typography>Register for netbanking and verify with your registered mobile number.</Typography></AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What should I do if I forget my password?</Typography>
        </AccordionSummary>
        <AccordionDetails><Typography>Use "Forgot Password" and follow OTP verification.</Typography></AccordionDetails>
      </Accordion>

      <Newsletter />
    </Container>
  );
}

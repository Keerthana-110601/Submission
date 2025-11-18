import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
} from "@mui/material";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = currentUser?.userId;
  const token = localStorage.getItem("token");

  // Fetch user's accounts
  useEffect(() => {
    if (!userId || !token) return;

    const fetchAccounts = async () => {
      try {
        const res = await fetch(`http://localhost:5135/api/account?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch accounts");

        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccounts();
  }, [userId, token]);

  // Fetch transactions for all user's accounts
  useEffect(() => {
    if (accounts.length === 0) return;

    const fetchTransactions = async () => {
      try {
        const accountIds = accounts.map((acc) => acc.accountId);
        const query = accountIds.map((id) => `accountIds=${id}`).join("&");

        const res = await fetch(`http://localhost:5135/api/account/transactions?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [accounts, token]);

  const view = (txn) => setSelected(txn);
  const close = () => setSelected(null);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#4caf50", py: 6 }}>
      <Container>
        <Typography variant="h5" gutterBottom color="white">
          Transaction History
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(255,255,255,0.85)", // semi-transparent
            backdropFilter: "blur(10px)",             // glass effect
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((txn, idx) => (
                  <TableRow key={`${txn.accountId}-${idx}`}>
                    <TableCell>{txn.account?.accountNumber || txn.accountId}</TableCell>
                    <TableCell>{txn.transcationType || "N/A"}</TableCell>
                    <TableCell>{txn.amount ?? "N/A"}</TableCell>
                    <TableCell>
                      {txn.transcationDate
                        ? new Date(txn.transcationDate.split(".")[0]).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" onClick={() => view(txn)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No transactions available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={!!selected} onClose={close} fullWidth maxWidth="sm">
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogContent dividers>
            {selected && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Account</Typography>
                  <Typography>{selected.account?.accountNumber || selected.accountId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Type</Typography>
                  <Typography>{selected.transcationType || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Amount</Typography>
                  <Typography>{selected.amount ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Date</Typography>
                  <Typography>
                    {selected.transcationDate
                      ? new Date(selected.transcationDate.split(".")[0]).toLocaleString()
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

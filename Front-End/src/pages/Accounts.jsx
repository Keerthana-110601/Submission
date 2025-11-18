import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
} from "@mui/material";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = currentUser?.userId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      console.warn("Missing userId or token, skipping fetch");
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5135/api/account?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (!response.ok) throw new Error(`Failed to fetch accounts: ${response.status}`);
        
        const data = await response.json();
        console.log("RAW fetched data:", data);
        
        setAccounts(data || []);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchAccounts();
  }, [userId, token]);

  const open = (acc) => {
    setSelected(acc);
    setAmount("");
  };
  const close = () => setSelected(null);

  const deposit = () => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.accountId === selected.accountId
          ? { ...a, balance: a.balance + Number(amount) }
          : a
      )
    );
    alert(`Deposited ${amount} ${selected.currency}`);
    close();
  };

  const withdraw = () => {
    if (Number(amount) > selected.balance) return alert("Insufficient balance");
    setAccounts((prev) =>
      prev.map((a) =>
        a.accountId === selected.accountId
          ? { ...a, balance: a.balance - Number(amount) }
          : a
      )
    );
    alert(`Withdrew ${amount} ${selected.currency}`);
    close();
  };

  const closeAccount = (id) => {
    if (!window.confirm("Close account?")) return;
    setAccounts((prev) => prev.filter((a) => a.accountId !== id));
    alert("Account closed");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6fcf97, #27ae60)",
        py: 6,
      }}
    >
      <Container>
        <Typography variant="h4" sx={{ mb: 4, color: "#fff", fontWeight: "bold" }}>
          Your Accounts
        </Typography>

        <Grid container spacing={3}>
          {accounts.length > 0 ? (
            accounts.map((acc, index) => (
              <Grid item key={acc.accountId|| index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {acc.accountType}
                  </Typography>
                  <Typography>ID: {acc.accountId}</Typography>
                  <Typography>
                    Balance: {acc.balance} {acc.currency}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="success" onClick={() => open(acc)}>
                      Deposit / Withdraw
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => closeAccount(acc.accountId)}>
                      Close
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ color: "#fff", mt: 6 }}>
              No accounts available
            </Typography>
          )}
        </Grid>

        <Dialog open={!!selected} onClose={close} fullWidth maxWidth="sm">
          <DialogTitle>
            {selected?.accountId} — {selected?.accountType}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={deposit}>
              Deposit
            </Button>
            <Button variant="contained" color="warning" onClick={withdraw}>
              Withdraw
            </Button>
            <Button onClick={close}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

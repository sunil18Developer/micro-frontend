import RemoteApp from "app2/App";
import RemoteApp3 from "app3/App";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TransactionDashboard = () => {
  // Sample transaction data
  const [transactions] = useState([
    {
      id: 1,
      transactionRef: "TRX12345",
      description: "Payment for invoice #5678",
      baseCurrency: "USD",
      targetCurrency: "EUR",
      exchangeRate: 0.92,
      amountInBase: 1000,
      amountInTarget: 920,
    },
    {
      id: 2,
      transactionRef: "TRX67890",
      description: "Travel expenses",
      baseCurrency: "INR",
      targetCurrency: "JPY",
      exchangeRate: 1.4,
      amountInBase: 7000,
      amountInTarget: 9800,
    },
    {
      id: 3,
      transactionRef: "TRX11223",
      description: "Office supplies purchase",
      baseCurrency: "GBP",
      targetCurrency: "USD",
      exchangeRate: 1.25,
      amountInBase: 200,
      amountInTarget: 250,
    },
  ]);

  const [searchText, setSearchText] = useState("");

  // Filter transactions based on Transaction Ref or Description
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.transactionRef
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Transaction Dashboard
        </Typography>

        <TextField
          label="Search by Transaction Ref or Description"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Transaction Ref</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Base Currency</strong>
                </TableCell>
                <TableCell>
                  <strong>Target Currency</strong>
                </TableCell>
                <TableCell>
                  <strong>Exchange Rate</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount in Base</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount in Target</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.transactionRef}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.baseCurrency}</TableCell>
                    <TableCell>{transaction.targetCurrency}</TableCell>
                    <TableCell>{transaction.exchangeRate}</TableCell>
                    <TableCell>{transaction.amountInBase}</TableCell>
                    <TableCell>{transaction.amountInTarget}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <RemoteApp />
      <RemoteApp3 />
    </>
  );
};

export default TransactionDashboard;

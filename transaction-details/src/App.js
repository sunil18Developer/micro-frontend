import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

const TransactionDetails = ({ transaction }) => {
  if (!transaction) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          No transaction selected. Please select a transaction to view details.
        </Typography>
      </Box>
    );
  }

  const {
    transactionRef,
    description,
    baseCurrency,
    targetCurrency,
    exchangeRate,
    amountInBase,
    amountInTarget,
    timestamp,
  } = transaction;

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Transaction Details
      </Typography>
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        <Stack spacing={3}>
          {/* Transaction Ref */}
          <Box>
            <Typography variant="h6">
              <strong>Transaction Ref:</strong> {transactionRef}
            </Typography>
          </Box>

          {/* Description */}
          <Box>
            <Typography variant="h6">
              <strong>Description:</strong> {description}
            </Typography>
          </Box>

          {/* Base and Target Currency */}
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="h6">
                <strong>Base Currency:</strong> {baseCurrency}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Target Currency:</strong> {targetCurrency}
              </Typography>
            </Box>
          </Stack>

          {/* Exchange Rate */}
          <Box>
            <Typography variant="h6">
              <strong>Exchange Rate:</strong> {exchangeRate}
            </Typography>
          </Box>

          {/* Amounts */}
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="h6">
                <strong>Amount in Base Currency:</strong> {amountInBase}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>Amount in Target Currency:</strong> {amountInTarget}
              </Typography>
            </Box>
          </Stack>

          {/* Timestamp */}
          <Box>
            <Typography variant="h6">
              <strong>Transaction Timestamp:</strong> {new Date(timestamp).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TransactionDetails;

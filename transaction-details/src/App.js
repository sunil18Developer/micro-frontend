import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTransaction } from "host/transaction";

const TransactionDetails = () => {
  const transaction = useSelector(selectTransaction);
  if (Object.keys(transaction).length === 0) {
    return (
      <Box sx={{ padding: "20px", textAlign: "left", width:"50%"}}>
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
  } = transaction;

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h5"  align="center" gutterBottom>
        Transaction Details
      </Typography>
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6">
              Transaction Ref:{transactionRef}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Description:{description}</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="h6">Base Currency:{baseCurrency}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                Target Currency:{targetCurrency}
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Typography variant="h6">Exchange Rate:{exchangeRate}</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="h6">
                Amount in Base Currency:{amountInBase}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                Amount in Target Currency:{amountInTarget}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TransactionDetails;

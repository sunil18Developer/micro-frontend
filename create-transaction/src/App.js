import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Button, Box, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux"
import { selectRates } from "host/rate";

const CurrencyTransactionForm = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [amountInBase, setAmountInBase] = useState("");
  const [amountInTarget, setAmountInTarget] = useState("");


  const rates = useSelector(selectRates)
  console.log(rates)

  const currencies = ["USD", "EUR", "GBP", "JPY", "INR", "CAD"];

  const calculateTargetAmount = () => {
    if (exchangeRate && amountInBase) {
      setAmountInTarget((amountInBase * exchangeRate).toFixed(2));
    } else {
      setAmountInTarget("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      baseCurrency,
      targetCurrency,
      exchangeRate,
      amountInBase,
      amountInTarget,
    });
    alert("Transaction details submitted successfully!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Currency Transaction
      </Typography>

      {/* Base Currency Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="baseCurrency-label">Base Currency</InputLabel>
        <Select
          labelId="baseCurrency-label"
          id="baseCurrency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          label="Base Currency"
          required
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Target Currency Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="targetCurrency-label">Target Currency</InputLabel>
        <Select
          labelId="targetCurrency-label"
          id="targetCurrency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          label="Target Currency"
          required
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Exchange Rate Input */}
      <TextField
        label="Exchange Rate"
        type="number"
        value={exchangeRate}
        onChange={(e) => {
          setExchangeRate(e.target.value);
          calculateTargetAmount();
        }}
        fullWidth
        required
      />

      {/* Amount in Base Currency Input */}
      <TextField
        label="Amount in Base Currency"
        type="number"
        value={amountInBase}
        onChange={(e) => {
          setAmountInBase(e.target.value);
          calculateTargetAmount();
        }}
        fullWidth
        required
      />

      {/* Auto-calculated Amount in Target Currency */}
      <TextField
        label="Amount in Target Currency"
        type="number"
        value={amountInTarget}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default CurrencyTransactionForm;

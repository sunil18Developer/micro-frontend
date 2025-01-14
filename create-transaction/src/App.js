import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectRates } from "host/rate";
import { addTransaction } from "host/transaction";

const CurrencyTransactionForm = () => {
  const [transactionRef, setTransactionRef] = useState("");
  const [description, setDescription] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [amountInBase, setAmountInBase] = useState("");
  const [amountInTarget, setAmountInTarget] = useState("");

  const rates = useSelector(selectRates);
  const dispatch = useDispatch();

  const currencies = Object.keys(rates || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTransaction({
        transactionRef,
        description,
        baseCurrency,
        targetCurrency,
        exchangeRate,
        amountInBase,
        amountInTarget,
      })
    );
    alert("Transaction details submitted successfully!");
    setTransactionRef("");
    setDescription("");
    setBaseCurrency("");
    setTargetCurrency("");
    setExchangeRate("");
    setAmountInBase("");
    setAmountInTarget("");
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
      <TextField
        label="Transaction Reference"
        value={transactionRef}
        onChange={(e) => setTransactionRef(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
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
        <FormControl fullWidth>
          <InputLabel id="targetCurrency-label">Target Currency</InputLabel>
          <Select
            labelId="targetCurrency-label"
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => {
              const selectedCurrency = e.target.value;

              if (!baseCurrency) {
                alert("Please select a base currency first.");
                return;
              }
              const exchangeRateForSelectedCurrency =
                rates[baseCurrency]?.exchangeRates[selectedCurrency];

              console.log("dfajdlksj", exchangeRateForSelectedCurrency);

              if (exchangeRateForSelectedCurrency) {
                setTargetCurrency(selectedCurrency);
                setExchangeRate(exchangeRateForSelectedCurrency);
                if (amountInBase) {
                  setAmountInTarget(
                    (amountInBase * exchangeRateForSelectedCurrency).toFixed(2)
                  );
                }
              } else {
                alert("Exchange rate not available for the selected currency.");
              }
            }}
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
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <TextField
          label="Amount in Base Currency"
          type="number"
          value={amountInBase}
          onChange={(e) => {
            const baseAmount = e.target.value;
            setAmountInBase(baseAmount);
            if (exchangeRate && baseAmount) {
              setAmountInTarget((baseAmount * exchangeRate).toFixed(2));
            } else {
              setAmountInTarget("");
            }
          }}
          fullWidth
          required
        />

        <TextField
          label="Exchange Rate"
          type="number"
          value={exchangeRate}
          fullWidth
        />
      </div>
      <TextField
        label="Amount in Target Currency"
        type="number"
        value={amountInTarget}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default CurrencyTransactionForm;

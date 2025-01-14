import RemoteApp from "app2/App";
import RemoteApp3 from "app3/App";

import React, { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setExchangeRates } from "./store/reducers/rate";
import { selectTransactions } from "./store/reducers/transaction";
import { setTransaction } from "./store/reducers/transaction";

const TransactionDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:3000/currencies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setExchangeRates(data));
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const transactions = useSelector(selectTransactions);

  const [searchText, setSearchText] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.transactionRef
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleRowSelection = (index, item) => {
    if (selectedIndex === index) {
      dispatch(setTransaction({}))
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(index);
      dispatch(setTransaction(item));
    }
  };

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
                <TableCell>
                  <strong>action (select)</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.transactionRef}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.baseCurrency}</TableCell>
                    <TableCell>{transaction.targetCurrency}</TableCell>
                    <TableCell>{transaction.exchangeRate}</TableCell>
                    <TableCell>{transaction.amountInBase}</TableCell>
                    <TableCell>{transaction.amountInTarget}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={selectedIndex === index ? "primary" : "default"}
                        onClick={() => handleRowSelection(index, transaction)}
                      >
                        {selectedIndex === index ? "Selected" : "Select"}
                      </Button>
                    </TableCell>
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <RemoteApp />
        <RemoteApp3 />
      </div>
    </>
  );
};

export default TransactionDashboard;

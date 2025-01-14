import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  transaction: {},
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

export const { addTransaction, deleteTransaction, setTransaction } =
  transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions.transactions;

export const selectTransaction = (state) => state.transactions.transaction;

export default transactionsSlice.reducer;

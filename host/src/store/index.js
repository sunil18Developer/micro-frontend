import { configureStore } from '@reduxjs/toolkit'
import ratesReducer from "./reducers/rate"
import transactionsReducer from "./reducers/transaction"

export const store = configureStore({
  reducer: {
    rates: ratesReducer,
    transactions: transactionsReducer,
  },
})
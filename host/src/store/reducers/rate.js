import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rates: [],
};

const exchangeRatesSlice = createSlice({
    name: "exchangeRates",
    initialState,
    reducers: {
        setExchangeRates: (state, action) => {
            state.rates = action.payload;
        },
    },
})

export const { setExchangeRates } = exchangeRatesSlice.actions;
export const selectRates = (state) => state.rates.rates

export default exchangeRatesSlice.reducer;
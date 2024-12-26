// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TopUpAmmount: 0,
  errorAmmount: "",
};

const TopUpSlice = createSlice({
  name: "TopUp",
  initialState,
  reducers: {
    setAmmount: (state, action) => {
      state.TopUpAmmount = action.payload;

      if (action.payload < 10000) {
        // state.TopUpAmmount = 10000;
        state.errorAmmount = "Minimum top-up Rp. 10.000";
      } else if (action.payload >= 1000001) {
        // state.TopUpAmmount = 1000000;
        state.errorAmmount = "Maximum top-up Rp. 1.000.000";
      } else {
        state.TopUpAmmount = action.payload;
        state.errorAmmount = "";
      }
    },
  },
});

export const { setAmmount } = TopUpSlice.actions;

export default TopUpSlice.reducer;

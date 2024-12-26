// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PembayaranAmmount: 0,
  errorMessage: "",
};

const PembayaranSlice = createSlice({
  name: "Pembayaran",
  initialState,
  reducers: {
    setSaldoSlice: (state, action) => {
      state.PembayaranAmmount = action.payload;
    },
    Payment: (state, action) => {
      //   state.PembayaranAmmount = action.payload;

      if (state.PembayaranAmmount < action.payload) {
        state.errorMessage = "Saldo Tidak Mencukupi";
      } else {
        state.errorMessage = "";
      }
    },
  },
});

export const { setSaldoSlice, Payment } = PembayaranSlice.actions;

export default PembayaranSlice.reducer;

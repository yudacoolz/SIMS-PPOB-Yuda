import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slices/LoginSlice";
import TopUpSlice from "./slices/TopUpSlice";
import PembayaranSlice from "./slices/PembayaranSlice";

export const store = configureStore({
  reducer: {
    login: LoginSlice,
    TopUp: TopUpSlice,
    Pembayaran: PembayaranSlice,
  },
});

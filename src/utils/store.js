import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../functions/authSlice";
import clientAuthReducer from "../functions/clientAuthSlice";
import loanPackageReducer from "../functions/loanPackageSlice";
import clientsReducer from "../functions/clientsSlice";
import loanApplyReducer from "../functions/loanApplySlice";
import documentReducer from "../functions/documentSlice";
import paymentReducer from "../functions/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientAuth: clientAuthReducer,
    packages: loanPackageReducer,
    clients: clientsReducer,
    apply: loanApplyReducer,
    docs: documentReducer,
    pay: paymentReducer,
  },
});

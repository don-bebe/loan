import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "../functions/authSlice";
import clientAuthReducer from "../functions/clientAuthSlice";
import loanPackageReducer from "../functions/loanPackageSlice";
import clientsReducer from "../functions/clientsSlice";
import loanApplyReducer from "../functions/loanApplySlice";
import documentReducer from "../functions/documentSlice";
import paymentReducer from "../functions/paymentSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
    clientAuth: clientAuthReducer,
    packages: loanPackageReducer,
    clients: clientsReducer,
    apply: loanApplyReducer,
    docs: documentReducer,
    pay: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
      reducer: persistedReducer,
})
export const persistor = persistStore(store);

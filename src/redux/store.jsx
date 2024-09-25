import { configureStore } from "@reduxjs/toolkit";
import auth from "./Auth/auth";
import authReducer from "./features/authState";
import themeReducer from "./features/themeSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import branch from "./Branch/Branch";
import alluser from "./User/User";
import country from "./Country/country";
import admin from "./Admin/admin";
import manager from "./Manager/manager";
import rider from "./Rider/rider";
import parcel from "./Parcel/Parcel";
import taxes from "./Taxes/taxes";
import ParcelPrice from "./ParcelPrice/ParcelPrice";
import Tracking from "./Tracking/Tracking";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["branch", "alluser", "country", "admin", "manager", "rider", "parcel", "taxes", "ParcelPrice", "Tracking"]
};

const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  [branch.reducerPath]: branch.reducer,
  [alluser.reducerPath]: alluser.reducer,
  [country.reducerPath]: country.reducer,
  [admin.reducerPath]: admin.reducer,
  [manager.reducerPath]: manager.reducer,
  [rider.reducerPath]: rider.reducer,
  [parcel.reducerPath]: parcel.reducer,
  [taxes.reducerPath]: taxes.reducer,
  [ParcelPrice.reducerPath]: ParcelPrice.reducer,
  [Tracking.reducerPath]: Tracking.reducer,
  userData: authReducer,
  appTheme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(auth.middleware)
      .concat(branch.middleware)
      .concat(alluser.middleware)
      .concat(country.middleware)
      .concat(admin.middleware)
      .concat(manager.middleware)
      .concat(rider.middleware)
      .concat(parcel.middleware)
      .concat(taxes.middleware)
      .concat(ParcelPrice.middleware)
      .concat(Tracking.middleware),
});

export default store;
export const persistor = persistStore(store);

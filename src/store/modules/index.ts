import {
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import authModule from "./authModule";
import customerModule from "./customerModule";
import tableModule from "./tableModule";
import reservationModule from "./reservationModule";
import settingModule from "./settingModule";

export type GenericRecuder<T> = {
  getStart: (
    state: T,
    action: PayloadAction<Array<Record<string, unknown>>>
  ) => void;
  getFailure: (state: T, action: PayloadAction<string>) => void;
};

export interface GenericModuleType {
  isLoading: boolean;
  error: string;
}
export const reducers = {
  authModule: authModule.reducer,
  customerModule: customerModule.reducer,
  tableModule: tableModule.reducer,
  reservationModule: reservationModule.reducer,
  settingModule: settingModule.reducer,
};

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

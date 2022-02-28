import {
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import authModule from "./authModule";
import customerModule from "./customerModule";

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
};

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

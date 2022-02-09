import {
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import authModule from "./authModule";

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
};

export const store = configureStore({
  reducer: combineReducers(reducers),
});

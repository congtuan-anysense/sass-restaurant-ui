import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./modules";
export const rootReducer = combineReducers({
  ...reducers,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

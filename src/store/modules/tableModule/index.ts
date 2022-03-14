import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "store";
import { TabelModuleData } from "./type";

type Reducer = {
  addTables: (state: any, action: PayloadAction<Array<any>>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const getInitialState = () => {
  return {
    isLoading: false,
    error: "",
    tables: [
      {
        id: 1,
        left: 0,
        top: 100,
        seat: 5,
        type: "rectangle",
        rotate: 0,
      },
      {
        id: 1,
        left: 400,
        top: 100,
        seat: 1,
        type: "rectangle",
        rotate: 0,
      },
      {
        id: 1,
        left: 600,
        top: 100,
        seat: 2,
        type: "rectangle",
        rotate: 0,
      },
      {
        id: 1,
        left: 800,
        top: 100,
        seat: 2,
        type: "rectangle",
        rotate: 0,
      },
      { id: 2, left: 15, top: 440, seat: 3, type: "counter", rotate: 0 },
      { id: 5, left: 259, top: 545, seat: 2, type: "counter", rotate: 90 },
    ],
  };
};

const initialState = getInitialState();

const tableModule = createSlice<TabelModuleData, Reducer>({
  name: "table",
  initialState,
  reducers: {
    addTables: (state, action) => {
      state.tables = [...state.tables, ...action.payload];
    },
    getStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { getStart, getFailure, addTables } = tableModule.actions;

export const getTablesInformation =
  (successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (error) {
      if (failureCallback) {
        failureCallback(error.response.data);
      }
    }
  };

export default tableModule;

export const tableModuleSelector = (state: RootState) => state.tableModule;

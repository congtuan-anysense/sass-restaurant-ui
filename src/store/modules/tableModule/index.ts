import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTablesData, setTablesData } from "services/utils/table";
import store, { RootState } from "store";
import { TabelModuleData, TableType } from "./type";

type Reducer = {
  addTables: (state: any, action: PayloadAction<Array<TableType>>) => void;
  updateTable: (state: any, action: PayloadAction<TableType>) => void;
  deleteTable: (state: any, action: PayloadAction<number | string>) => void;
  updateTables: (state: any, action: PayloadAction<Array<TableType>>) => void;
  updatePresentStatus: (state: any, action: PayloadAction<boolean>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const getInitialState = () => {
  return {
    isLoading: false,
    error: "",
    isPresent: false,
    tables: getTablesData(),
  };
};

const initialState = getInitialState();

const tableModule = createSlice<TabelModuleData, Reducer>({
  name: "table",
  initialState,
  reducers: {
    addTables: (state, action) => {
      const tables = [...state.tables, ...action.payload];
      state.tables = tables;
    },
    updateTable: (state, action) => {
      const tables = state.tables.map((table) => {
        if (table.id === action.payload.id) {
          return action.payload;
        }
        return table;
      });
      state.tables = tables;
    },
    updateTables: (state, action) => {
      state.tables = action.payload;
    },
    deleteTable: (state, action) => {
      const tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
      state.tables = tables;
    },
    updatePresentStatus: (state, action) => {
      state.isPresent = action.payload;
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
export const {
  getStart,
  getFailure,
  addTables,
  updateTable,
  deleteTable,
  updatePresentStatus,
  updateTables,
} = tableModule.actions;

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

export const updateLocalTablesData = (
  tables: Array<TableType>,
  successCallback = null,
  failureCallback = null
) => {
  try {
    setTablesData(tables);
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

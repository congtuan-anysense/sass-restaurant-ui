import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createFloorAPI, getFloorDetailAPI, updateFloorAPI } from "apis/floors";
import { getAllTablesAPI } from "apis/reservations";
import { STATUS_CODE } from "config/api";
import { FLOOR_INIT } from "config/const";
import { getFloorLocalData, setFloorData } from "services/utils/table";
import store, { RootState } from "store";
import {
  FloorType,
  TabelModuleData,
  TableAttributeType,
  TablePropsType,
} from "./type";

type Reducer = {
  addTables: (state: any, action: PayloadAction<Array<TablePropsType>>) => void;
  updateTable: (state: any, action: PayloadAction<TablePropsType>) => void;
  updateFloor: (state: any, action: PayloadAction<FloorType>) => void;
  deleteTable: (state: any, action: PayloadAction<number | string>) => void;
  updateTables: (
    state: any,
    action: PayloadAction<Array<TablePropsType>>
  ) => void;
  updateListTables: (state: any, action: PayloadAction<Array<any>>) => void;
  updatePresentStatus: (state: any, action: PayloadAction<boolean>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const initialState = {
  isLoading: false,
  error: "",
  isPresent: false,
  floor: getFloorLocalData(),
  tables: [],
};

const tableModule = createSlice<TabelModuleData, Reducer>({
  name: "table",
  initialState,
  reducers: {
    addTables: (state, action) => {
      const tables = [...state.floor.tables, ...action.payload];
      state.floor.tables = tables;
      state.isLoading = false;
      state.error = action.payload;
    },
    updateFloor: (state, action) => {
      state.floor = action.payload;
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTable: (state, action) => {
      const tables = state.floor.tables.map((table) => {
        if (table.properties.id === action.payload.id) {
          table.properties = action.payload;
        }
        return table;
      });
      state.floor.tables = tables;
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTables: (state, action) => {
      state.floor.tables = action.payload;
    },
    updateListTables: (state, action) => {
      state.tables = action.payload;
    },
    deleteTable: (state, action) => {
      const tables = state.floor.tables.map((table) => {
        if (table.properties.id === action.payload) {
          table._destroy = true;
        }
        return table;
      });
      state.floor.tables = tables;
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
  updateListTables,
  updateFloor,
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

export const updateLocalTablesData =
  (
    tables: Array<TableAttributeType>,
    successCallback = null,
    failureCallback = null
  ) =>
  async (dispatch) => {
    const handleUpdateFloor = (floor) => {
      floor.tables = floor.tables.map((table) => {
        table.attributes.properties = JSON.parse(table.attributes.properties);
        table.attributes.properties.id = table.id;
        return table.attributes;
      });
      dispatch(updateFloor(floor));
      setFloorData(floor);
    };
    try {
      const tablesData = tables
        .filter((table) => !(!table.id && table._destroy))
        .map((table) => {
          const properties = table?.properties;
          const tableEle = document.getElementById(
            `${properties.type}__${properties.id}`
          );
          if (!tableEle) return { ...table, deleted: true };
          const tableStyleComputed = getComputedStyle(tableEle);
          const top = Number(tableStyleComputed.top.split("px")[0]);
          const left = Number(tableStyleComputed.left.split("px")[0]);
          const props = {
            ...properties,
            top: top,
            left: left,
          };
          delete props.id;
          return {
            ...table,
            properties: JSON.stringify(props),
          };
        });
      const floor = store.getState().tableModule.floor;
      const payload = {
        floor: {
          id: floor.id,
          name: FLOOR_INIT.name,
          table_attributes: tablesData,
        },
      };

      const {
        data: { data },
      } = await updateFloorAPI(floor.id, payload);
      handleUpdateFloor(data);
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (error) {
      if (failureCallback) {
        failureCallback(error);
        console.log(error);
      }
    }
  };

export const getFloorDetail =
  (id: number | string, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    const handleUpdateFloor = (floor) => {
      floor.tables = floor.tables.map((table) => {
        table.attributes.properties = JSON.parse(table.attributes.properties);
        table.attributes.properties.id = table.id;
        return table.attributes;
      });
      dispatch(updateFloor(floor));
      setFloorData(floor);
    };

    try {
      const {
        data: { data },
      } = await getFloorDetailAPI(id);
      handleUpdateFloor(data);
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (errorDetail) {
      if (errorDetail.response.data.code === STATUS_CODE.NOT_FOUND) {
        try {
          const payload = { floor: FLOOR_INIT };
          const {
            data: { data },
          } = await createFloorAPI(payload);
          handleUpdateFloor(data);
        } catch (errorCreation) {
          if (failureCallback) {
            failureCallback(errorCreation.response.data);
          }
        }
      }
    }
  };

export const getListTables =
  (successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      const {
        data: {
          data: { tables },
        },
      } = await getAllTablesAPI();
      dispatch(updateListTables(tables));
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

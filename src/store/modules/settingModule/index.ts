import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReservationsAPI } from "apis/reservations";
import { getRestaurantSettingAPI } from "apis/setting";
import { CALENDAR_DUMMY_DATA } from "config/const";
import store, { RootState } from "store";
import { SettingModuleData } from "./type";

type Reducer = {
  updateSetting: (state: any, action: PayloadAction<any>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const initialState = {
  isLoading: false,
  error: "",
  setting: {
    startTime: CALENDAR_DUMMY_DATA.startTime,
    endTime: CALENDAR_DUMMY_DATA.endTime,
  },
};

const settingModule = createSlice<SettingModuleData, Reducer>({
  name: "table",
  initialState,
  reducers: {
    updateSetting: (state, action) => {
      state.setting = action.payload;
      state.isLoading = true;
      state.error = null;
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
export const { getStart, getFailure, updateSetting } = settingModule.actions;

export const getRestaurantSetting =
  (successCallback = null, failtureCallback = null) =>
  async (dispatch) => {
    try {
      dispatch(getStart());
      const {
        data: {
          data: { attributes },
        },
      } = await getRestaurantSettingAPI();
      const getTimeNumber = (time) => Number(time.split(":")[0]);
      const setting = {
        ...attributes,
        startTime: getTimeNumber(attributes.openHours),
        endTime: getTimeNumber(attributes.closeHours),
      };

      dispatch(updateSetting(setting));
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (error) {
      if (failtureCallback) {
        failtureCallback(error);
      }
    }
  };

export default settingModule;

export const settingModuleSelector = (state: RootState) => state.settingModule;

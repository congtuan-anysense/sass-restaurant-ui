import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReservationsAPI } from "apis/reservations";
import { getDateTimeInformation } from "services/utils/datetime";
import store, { RootState } from "store";
import { ReservationModuleData } from "./type";

type Reducer = {
  updateReservations: (state: any, action: PayloadAction<any>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const initialState = {
  isLoading: false,
  error: "",
  reservations: [],
};

const reservationModule = createSlice<ReservationModuleData, Reducer>({
  name: "table",
  initialState,
  reducers: {
    updateReservations: (state, action) => {
      state.reservations = action.payload;
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
export const { getStart, getFailure, updateReservations } =
  reservationModule.actions;

export const getReservations =
  (date: string = null, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const {
        data: {
          data: { reservations: reservations },
        },
      } = await getReservationsAPI();
      dispatch(updateReservations(reservations));
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (error) {
      if (failureCallback) {
        failureCallback(error.response.data);
      }
    }
  };

export default reservationModule;

export const reservationModuleSelector = (state: RootState) =>
  state.reservationModule;

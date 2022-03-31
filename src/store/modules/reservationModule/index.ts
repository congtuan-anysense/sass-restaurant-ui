import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReservationsAPI } from "apis/reservations";
import store, { RootState } from "store";
import { ReservationModuleData } from "./type";

type Reducer = {
  updateReservations: (state: any, action: PayloadAction<any>) => void;
  updateRefresh: (state: any, action: PayloadAction<any>) => void;
  updateActiveDate: (state: any, action: PayloadAction<Date>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const initialState = {
  isLoading: false,
  error: "",
  isRefresh: true,
  activeDate: new Date(),
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
    updateRefresh: (state, action) => {
      state.isRefresh = action.payload;
      state.isLoading = true;
      state.error = null;
    },
    updateActiveDate: (state, action) => {
      state.activeDate = action.payload;
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
export const {
  getStart,
  getFailure,
  updateReservations,
  updateRefresh,
  updateActiveDate,
} = reservationModule.actions;

export const getReservations =
  (date: Date = null, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const {
        data: {
          data: { reservations: reservations },
        },
      } = await getReservationsAPI(date);
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

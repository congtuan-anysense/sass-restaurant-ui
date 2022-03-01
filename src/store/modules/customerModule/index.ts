import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCustomerAPI,
  deleteCustomerAPI,
  editCustomerAPI,
  getCustomerAPI,
  getCustomersAPI,
} from "apis/customer";
import { ListCustomerPayload } from "apis/customer/type";
import store, { RootState } from "store";
import { CustomerData, NewCustomerPayload } from "./type";

type Reducer = {
  updateCustomers: (state: any, action: PayloadAction<any>) => void;
  updateCustomersAfterDelete: (
    state: any,
    action: PayloadAction<number>
  ) => void;
  updateCurrentCustomer: (state: any, action: PayloadAction<any>) => void;
  updateCustomer: (
    state: any,
    action: PayloadAction<{ field: string; value: any }>
  ) => void;
  resetCurrentCustomer: (state: any, action: PayloadAction<Array<any>>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const getInitialState = () => {
  return {
    isLoading: false,
    error: "",
    customer: {
      current: null,
      customers: [],
      paging: {
        total: 0,
        page: 0,
        limit: 0,
      },
    },
  };
};

const initialState = getInitialState();

const customerModule = createSlice<CustomerData, Reducer>({
  name: "customer",
  initialState,
  reducers: {
    updateCustomers: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
      state.isLoading = false;
      state.error = null;
    },
    updateCurrentCustomer: (state, action) => {
      state.customer = { ...state.customer, current: action.payload };
      state.isLoading = false;
      state.error = null;
    },
    updateCustomer: (state, action) => {
      state.customer.current.attributes[action.payload.field] =
        action.payload.value;
      state.isLoading = false;
      state.error = null;
    },
    updateCustomersAfterDelete: (state, action) => {
      const customers = state.customer.customers.filter((customer) => {
        return customer?.attributes?.id !== action.payload;
      });
      state.customer.customers = customers;
      state.isLoading = false;
      state.error = null;
    },
    resetCurrentCustomer: (state) => {
      state.customer.current = {};
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
  updateCustomers,
  getStart,
  getFailure,
  updateCurrentCustomer,
  resetCurrentCustomer,
  updateCustomer,
  updateCustomersAfterDelete,
} = customerModule.actions;

export const getCustomers =
  (
    arg: ListCustomerPayload = {},
    successCallback = null,
    failureCallback = null
  ) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const result = await getCustomersAPI(arg);
      await dispatch(updateCustomers(result.data.data));
      if (successCallback) {
        successCallback(store.getState().authModule);
      }
    } catch (error) {
      if (failureCallback) {
        failureCallback(error.response.data);
      }
    }
  };

export const getCustomer =
  (id: number, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const result = await getCustomerAPI(id);
      await dispatch(updateCurrentCustomer(result.data.data));
      if (successCallback) {
        successCallback(store.getState().customerModule);
      }
    } catch (error) {
      console.log(error);
      if (failureCallback) {
        failureCallback(error);
      }
    }
  };

export const upsertCustomer =
  (data: NewCustomerPayload, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      let result = null;
      await dispatch(getStart());
      if (data.customer.id) {
        result = await editCustomerAPI(data.customer.id, data);
      } else {
        delete data.customer.id;
        result = await createCustomerAPI(data);
      }
      if (successCallback) {
        successCallback(result);
      }
    } catch (error) {
      console.error(error);
      if (failureCallback) {
        failureCallback(error);
      }
    }
  };

export const deleteCustomer =
  (id: number, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      await deleteCustomerAPI(id);
      if (successCallback) {
        successCallback(store.getState().customerModule);
      }
    } catch (error) {
      console.error(error);
      if (failureCallback) {
        failureCallback(error);
      }
    }
  };

export default customerModule;

export const customerModuleSelector = (state: RootState) =>
  state.customerModule;

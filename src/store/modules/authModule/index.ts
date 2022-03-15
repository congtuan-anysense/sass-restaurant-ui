import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "apis/auth";
import { RegisterPayload } from "apis/auth/type";
import { getSession, setSession } from "services/utils/auth";
import store, { RootState } from "store";
import { AuthData, LoginForm, ResponseForm } from "./type";

type Reducer = {
  getSuccessLogin: (state: any, action: PayloadAction<ResponseForm>) => void;
  updateLoginState: (state: any, action: PayloadAction<boolean>) => void;
  getStart: (state: any, action: PayloadAction<Array<any>>) => void;
  getFailure: (state: any, action: PayloadAction<string>) => void;
};

const initialState = {
  isLoading: false,
  error: "",
  data: getSession(),
  isLoggedIn: false,
};

const authModule = createSlice<AuthData, Reducer>({
  name: "auth",
  initialState,
  reducers: {
    getSuccessLogin: (state, action) => {
      state.isLoading = true;
      state.data = action.payload;
      setSession(action.payload);
    },
    updateLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
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
export const { getSuccessLogin, getStart, getFailure, updateLoginState } =
  authModule.actions;

export const authLogin =
  (args: LoginForm, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const {
        data: { data },
        headers,
      } = await loginAPI(args.email, args.password, args.restaurant);
      await dispatch(getSuccessLogin({ ...data, ...headers }));
      if (successCallback) successCallback(store.getState().authModule);
    } catch (error) {
      console.error(error);
      failureCallback(error.response.data);
    }
  };

export const authRegister =
  (arg: RegisterPayload, successCallback = null, failureCallback = null) =>
  async (dispatch) => {
    try {
      await dispatch(getStart());
      const { data } = await registerAPI(arg);
      if (data.success) {
        if (successCallback) successCallback(store.getState().authModule);
      }
    } catch (error) {
      console.error(error);
      failureCallback(error.response.data);
    }
  };

export default authModule;
export const authModuleSelector = (state: RootState) => state.authModule;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IRegister, IState, IUser } from "./authTypes";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")!) as IUser;

const initialState: IState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: IRegister, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: ILogin, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IState) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: IState) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        register.fulfilled,
        (state: IState, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state: IState) => {
        state.user = null;
      })
      .addCase(login.pending, (state: IState) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        login.fulfilled,
        (state: IState, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(login.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;

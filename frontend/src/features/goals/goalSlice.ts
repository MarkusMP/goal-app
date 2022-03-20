import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import goalService from "./goalService";
import { IGoal, IGoalCreate, IState } from "./goalTypes";
import { RootState } from "../../app/store";

const initialState: IState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: IGoalCreate, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token || "";
      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token || "";
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token || "";
      return await goalService.deleteGoal(goalId, token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state: IState) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(
        createGoal.fulfilled,
        (state: IState, action: PayloadAction<IGoal>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals.push(action.payload);
        }
      )
      .addCase(
        createGoal.rejected,
        (state: IState, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(getGoals.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(
        getGoals.fulfilled,
        (state: IState, action: PayloadAction<IGoal[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = action.payload;
        }
      )
      .addCase(
        getGoals.rejected,
        (state: IState, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(deleteGoal.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(
        deleteGoal.fulfilled,
        (state: IState, action: PayloadAction<any>) => {
          state.goals = state.goals.filter(
            (goal) => goal.id !== action.payload.goalId
          );
          state.isLoading = false;
          state.isSuccess = true;
        }
      )
      .addCase(
        deleteGoal.rejected,
        (state: IState, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;

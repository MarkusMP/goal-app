export interface IGoal {
  id: string;
  text: string;
  created_at: string;
}

export interface IState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  goals: IGoal[];
}

export interface IGoalCreate {
  text: string;
}

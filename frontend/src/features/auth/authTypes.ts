export interface IRegister {
  password: string;
  email: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
  created_at: string;
}

export interface IState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ILogin {
  email: string;
  password: string;
}

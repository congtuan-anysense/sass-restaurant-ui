export type LoginForm = {
  email: string;
  password: string;
  restaurant: string;
};

export type ResponseForm = {
  email: string;
  uid: string;
  id: number;
  provider: string;
  allow_password_change: boolean;
  name: string;
  nickname: string;
  image: string;
};

export type AuthData = {
  isLoading: boolean;
  error: string;
  data: any;
  isLoggedIn: boolean;
};

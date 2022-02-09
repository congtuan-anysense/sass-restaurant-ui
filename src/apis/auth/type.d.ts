export type RegisterPayload = {
  owner_email: string;
  owner_name: string;
  owner_password: string;
  owner_password_confirmation: string;
  company_name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  restaurant: string;
};

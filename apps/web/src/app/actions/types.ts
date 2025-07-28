export type SignInResponse = {
  error?: string;
  url?: string;
  ok: boolean;
};

export type RegisterFormState = {
  success?: boolean;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  systemError?: string;
}; 
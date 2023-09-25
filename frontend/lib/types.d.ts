
export interface User {
  email?: string;
  name?: string;
  password?: string;
}

export interface UserWithAuth {
  user?: User;
  authToken?: string;
}
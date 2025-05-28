export enum Role {
  User = 'user',
  Admin = 'admin',
}

type User = {
  id: number;
  username: string;
  password: string;
  role: Role;
};

export interface IAuthenticate {
  user: User;
  token: string;
}

export interface UserBase {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  description?: string;
  imgSrc?: string;
}

export interface User extends UserBase {
  id: string;
  description?: string;
}

export type UserName = Pick<UserBase, "name">;
export type UserSurname = Pick<UserBase, "surname">;
export type UserEmail = Pick<UserBase, "email">;

export type UserRole = "admin" | "lecturer" | "user";

export interface JwtPayload extends Pick<User, "id" | "role" | "email"> {
  iat: number;
  exp: number;
}

export type ActivateTokenPayload = Omit<UserBase, "role" | "version">;

export type LoginSchema = Pick<UserBase, "email"> & { password: string };

export interface ActivateAccountSchema {
  password: string;
  activateToken: string;
}

//For forms

export interface ActivateAccountFormSchema extends Omit<UserBase, "role"> {
  password: string;
  confirmPassword: string;
}

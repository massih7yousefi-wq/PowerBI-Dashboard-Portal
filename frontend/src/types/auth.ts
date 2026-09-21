export type UserRole = 'Admin' | 'User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: UserResponse;
}

export interface AuthSession {
  token: string;
  expiresAt: string;
  user: UserResponse;
}
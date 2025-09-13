import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    role: string; // Assuming role is a string, adjust as necessary
    userId: string; // This is the user ID from the JWT payload
    username: string;
  };
}

export interface AuthenticatedUserRequest
  extends Request,
    Omit<User, 'password'> {
  user: User;
}

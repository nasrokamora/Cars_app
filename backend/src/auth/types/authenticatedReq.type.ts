import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    role: string; // Assuming role is a string, adjust as necessary
    userId: string; // This is the user ID from the JWT payload
  };
}

export interface AuthenticatedUserRequest extends Request {
  user: User;
}

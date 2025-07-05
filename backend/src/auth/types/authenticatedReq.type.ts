export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string; // Assuming role is a string, adjust as necessary
    userId: number; // This is the user ID from the JWT payload
  };
}

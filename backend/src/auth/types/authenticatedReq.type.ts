export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string; // Assuming role is a string, adjust as necessary
  };
}

export type JwtRefreshPayload = {
  /**
   * The unique identifier of the user who owns the token.
   */
  sub: string;
  /**
   * The email of the user who owns the token.
   */
  email: string;
  /**
   * The user id of the user who owns the token.
   */
  //   userId: string;
  /**
   * The date and time when the token was issued.
   */
  iat: number;
  /**
   * The date and time when the token will expire.
   */
  exp: number;
  /**
   * The unique identifier for the token itself.
   */
  jti: string;
};

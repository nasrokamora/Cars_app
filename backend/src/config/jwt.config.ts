import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
  accessCookieName: process.env.ACCESS_COOKIE_NAME || 'access_token',
  refreshCookieName: process.env.REFRESH_COOKIE_NAME || 'refresh_token',
}));

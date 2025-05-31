// jwt.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
  
  // Debug log (remove in production)
  console.log('JWT Config loaded:', {
    secret: config.secret ? '***SET***' : 'NOT SET',
    audience: config.audience,
    issuer: config.issuer,
    accessTokenTtl: config.accessTokenTtl,
    refreshTokenTtl: config.refreshTokenTtl,
  });
  
  return config;
});


import { Request } from 'express';

interface JwtUser {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}

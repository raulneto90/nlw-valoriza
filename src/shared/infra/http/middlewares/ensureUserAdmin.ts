import { NextFunction, Request, Response } from 'express';

export function ensureUserAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const admin = true;

  if (admin) return next();

  return response.status(401).json({ message: 'Unauthorized' });
}

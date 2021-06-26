import { NextFunction, Request, Response } from 'express';

export function ensureUserAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  if (request.user.admin) return next();

  return response.status(401).json({ message: 'Unauthorized' });
}

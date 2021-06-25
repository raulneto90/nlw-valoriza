import authConfig from '@config/auth';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

export async function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, authConfig.secret) as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid request!', 401);
    }

    request.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError('Token invalid!', 401);
  }
}

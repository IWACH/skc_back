import { Request, Response, NextFunction } from 'express';
import { handlePrismaError } from '../helpers/prisma-error-handler';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('=== Error Handler ===');
  console.log('Type:', error.name);
  console.log('Message:', error.message);
  console.log('Stack:', error.stack);
  console.log('==================');

  const errorResponse = handlePrismaError(error);
  return res.status(errorResponse.statusCode).json(errorResponse);
}; 
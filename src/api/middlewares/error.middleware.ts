import { Request, Response, NextFunction } from "express";
import { handlePrismaError } from "../../core/errors/helpers/prisma-error-handler";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.log("=== Error Handler ===");
  console.log("Type:", error.name);
  console.log("Message:", error.message);
  console.log("Stack:", error.stack);
  console.log("==================");

  const errorResponse = handlePrismaError(error);
  return res.status(errorResponse.statusCode).json(errorResponse);
};

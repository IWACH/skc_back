import { 
  PrismaClientKnownRequestError, 
  PrismaClientValidationError 
} from "@prisma/client/runtime/library";
import { IErrorResponse } from '../interfaces/error-response.interface';
import { getErrorMessage } from '../../utils/get-error-message.util';

export const handlePrismaError = (
  error: unknown,
  defaultMessage: string = "Error en la operación"
): IErrorResponse => {
  if (error instanceof PrismaClientKnownRequestError) {
    const details = error.meta?.target 
      ? Array.isArray(error.meta.target)
        ? error.meta.target.join(", ")
        : error.meta.target.toString()
      : "campo desconocido";

    const message = getErrorMessage(error.code, [details]);
    
    const statusCodeMap: Record<string, number> = {
      P2002: 400,
      P2003: 400,
      P2004: 400,
      P2014: 400,
      P2025: 404,
    };

    return {
      success: false,
      message,
      statusCode: statusCodeMap[error.code] || 500,
      error: error.message
    };
  }

  if (error instanceof PrismaClientValidationError) {
    return {
      success: false,
      message: "Error de validación en los datos",
      statusCode: 400,
      error: error.message
    };
  }

  return {
    success: false,
    message: defaultMessage,
    statusCode: 500,
    error: error instanceof Error ? error.message : "Error desconocido"
  };
};

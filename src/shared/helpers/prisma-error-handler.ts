import { 
  PrismaClientKnownRequestError, 
  PrismaClientValidationError 
} from "@prisma/client/runtime/library";
import { errorMessages } from "../constants/error-messages";

interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  error?: string;
}

const getErrorMessage = (
  code: string, 
  replaces: string[] = [], 
  lang: keyof typeof errorMessages = 'es'
): string => {
  let errorMsg = errorMessages[lang][code as keyof typeof errorMessages[typeof lang]];
  
  if (errorMsg) {
    replaces.forEach((value, index) => {
      errorMsg = errorMsg.replace(`$${index}`, value);
    });
    return errorMsg;
  }
  
  return errorMessages[lang].defaultError;
};

export const handlePrismaError = (
  error: unknown,
  defaultMessage: string = "Error en la operación"
): ErrorResponse => {
  if (error instanceof PrismaClientKnownRequestError) {
    const details = error.meta?.target 
      ? Array.isArray(error.meta.target)
        ? error.meta.target.join(", ")
        : error.meta.target.toString()
      : "campo desconocido";

    const message = getErrorMessage(error.code, [details]);
    
    const statusCodeMap: Record<string, number> = {
      P2002: 400, // Unique constraint
      P2003: 400, // Foreign key constraint
      P2004: 400, // Not null constraint
      P2014: 400, // Required relation
      P2025: 404, // Not found
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

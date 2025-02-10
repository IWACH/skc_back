export interface IPrismaError {
  code: string;
  meta?: {
    target?: string[];
  };
  message: string;
} 
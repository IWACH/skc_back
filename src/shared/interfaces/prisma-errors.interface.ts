export type IPrismaError = {
  code: string;
  meta?: {
    target?: string[];
  };
  message: string;
} 
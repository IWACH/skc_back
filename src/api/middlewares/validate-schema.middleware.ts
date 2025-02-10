import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.errors[0].message
      });
    }
  };
}; 
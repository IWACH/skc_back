import { NextFunction, Request, Response } from 'express';

import prisma from '../../../config/database';
import { handlePrismaError } from '../../../shared/helpers/prisma-error-handler';

interface TypeResponse {
  success: boolean;
  data?: any;
  message: string;
  error?: string;
}

// Listar todos los tipos
export const list = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const types = await prisma.type.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const response: TypeResponse = {
      success: true,
      data: types,
      message: "Tipos obtenidos exitosamente",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Obtener un tipo por ID
export const get = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const type = await prisma.type.findUnique({
      where: { id: Number(id) },
    });

    if (!type) {
      const response: TypeResponse = {
        success: false,
        message: `No se encontró el tipo con ID ${id}`,
      };

      res.status(404).json(response);
      return;
    }

    const response: TypeResponse = {
      success: true,
      data: type,
      message: "Tipo obtenido exitosamente",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo tipo
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type, value, label } = req.body;

    const newType = await prisma.type.create({
      data: {
        type,
        value,
        label,
      },
    });

    const response: TypeResponse = {
      success: true,
      data: newType,
      message: "Tipo creado exitosamente",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Actualizar un tipo
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, value, label } = req.body;

    const existingType = await prisma.type.findUnique({
      where: { id: Number(id) },
    });

    if (!existingType) {
      const response: TypeResponse = {
        success: false,
        message: `No se encontró el tipo con ID ${id}`,
      };

      res.status(404).json(response);
      return;
    }

    const updatedType = await prisma.type.update({
      where: { id: Number(id) },
      data: {
        type,
        value,
        label,
      },
    });

    const response: TypeResponse = {
      success: true,
      data: updatedType,
      message: "Tipo actualizado exitosamente",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Eliminar un tipo
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingType = await prisma.type.findUnique({
      where: { id: Number(id) },
    });

    if (!existingType) {
      const response: TypeResponse = {
        success: false,
        message: `No se encontró el tipo con ID ${id}`,
      };

      res.status(404).json(response);
      return;
    }

    await prisma.type.delete({
      where: { id: Number(id) },
    });

    const response: TypeResponse = {
      success: true,
      message: "Tipo eliminado exitosamente",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

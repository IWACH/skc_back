import { NextFunction, Request, Response } from "express";

import prisma from "../../config/database";

import {
  IBaseControllerOptions,
  IBaseResponse,
} from "./interfaces/base.interface";
import { handlePrismaError } from "../../shared/errors/helpers/prisma-error-handler";

export const createBaseController = (
  model: string,
  options: IBaseControllerOptions = {}
) => {
  const {
    excludedFields = [],
    defaultInclude = {},
    searchFields = [],
  } = options;

  const getEntityMessages = () => ({
    notFound: `${model} no encontrado`,
    listedAll: `${model}s listados exitosamente`,
    listed: `${model} listado exitosamente`,
    created: `${model} creado exitosamente`,
    updated: `${model} actualizado exitosamente`,
    deleted: `${model} eliminado exitosamente`,
  });

  const sendResponse = (
    res: Response,
    { success, data, message, meta }: IBaseResponse,
    status: number = 200
  ): void => {
    res.status(status).json({ success, data, message, ...meta });
  };

  const prepareFindObject = (query: any = {}) => {
    const { search, page, limit, ...filters } = query;

    const findObject: any = {
      where: {},
      include: defaultInclude,
    };

    if (search && searchFields.length > 0) {
      findObject.where.OR = searchFields.map((field: string) => ({
        [field]: { contains: search },
      }));
    }

    if (page && limit) {
      findObject.skip = (parseInt(page) - 1) * parseInt(limit);
      findObject.take = parseInt(limit);
    }

    // Agregar filtros adicionales
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        findObject.where[key] = value;
      }
    });

    return findObject;
  };

  const excludeFields = (obj: any): any => {
    const newObj = { ...obj };
    excludedFields.forEach((field) => delete newObj[field]);
    return newObj;
  };

  // Funciones CRUD
  const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findObject = prepareFindObject(req.query);

      const [total, items] = await prisma.$transaction([
        (prisma as any)[model].count({ where: findObject.where }),
        (prisma as any)[model].findMany({
          ...findObject,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      const cleanedItems = items.map((item) => excludeFields(item));

      sendResponse(res, {
        success: true,
        data: cleanedItems,
        message: getEntityMessages().listedAll,
        meta: {
          total,
          page: parseInt(req.query.page as string) || 1,
          limit: parseInt(req.query.limit as string) || total,
        },
      });
    } catch (error) {
      const errorResponse = handlePrismaError(error);
      sendResponse(res, errorResponse, errorResponse.statusCode);
    }
  };

  const get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await (prisma as any)[model].findUnique({
        where: { id: Number(id) },
        include: defaultInclude,
      });

      if (!item) {
        sendResponse(
          res,
          {
            success: false,
            message: getEntityMessages().notFound,
          },
          404
        );
        return;
      }

      sendResponse(res, {
        success: true,
        data: excludeFields(item),
        message: getEntityMessages().listed,
      });
    } catch (error) {
      const errorResponse = handlePrismaError(error);
      sendResponse(res, errorResponse, errorResponse.statusCode);
    }
  };

  const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newItem = await (prisma as any)[model].create({
        data: req.body,
        include: defaultInclude,
      });

      sendResponse(
        res,
        {
          success: true,
          data: excludeFields(newItem),
          message: getEntityMessages().created,
        },
        201
      );
    } catch (error) {
      const errorResponse = handlePrismaError(error, `Error al crear ${model}`);
      sendResponse(res, errorResponse, errorResponse.statusCode);
    }
  };

  const update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedItem = await (prisma as any)[model].update({
        where: { id: Number(id) },
        data: req.body,
        include: defaultInclude,
      });

      sendResponse(res, {
        success: true,
        data: excludeFields(updatedItem),
        message: getEntityMessages().updated,
      });
    } catch (error) {
      const errorResponse = handlePrismaError(
        error,
        `Error al actualizar ${model}`
      );
      sendResponse(res, errorResponse, errorResponse.statusCode);
    }
  };

  const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const existingItem = await (prisma as any)[model].findUnique({
        where: { id: Number(id) },
      });

      if (!existingItem) {
        sendResponse(
          res,
          {
            success: false,
            message: getEntityMessages().notFound,
          },
          404
        );
        return;
      }

      await (prisma as any)[model].delete({
        where: { id: Number(id) },
      });

      sendResponse(res, {
        success: true,
        data: { id: Number(id) },
        message: getEntityMessages().deleted,
      });
    } catch (error) {
      const errorResponse = handlePrismaError(
        error,
        `Error al eliminar ${model}`
      );
      sendResponse(res, errorResponse, errorResponse.statusCode);
    }
  };

  return {
    list,
    get,
    create,
    update,
    remove,
  };
};

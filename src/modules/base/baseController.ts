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
    customSort = { field: "createdAt", order: "desc" },
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
    const { search, sortField, sortOrder, ...filters } = query;

    const findObject: any = {
      where: {},
      include: defaultInclude,
      orderBy: {
        [sortField || customSort.field]: (
          sortOrder || customSort.order
        ).toLowerCase(),
      },
    };

    if (search && searchFields.length > 0) {
      findObject.where.OR = searchFields.map((field: string) => ({
        [field]: { contains: search },
      }));
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

  const cleanObjectBeforeSend = (obj: any): any => {
    const cleaned = excludeFields(obj);
    // Aquí puedes agregar lógica adicional de limpieza
    return cleaned;
  };

  const prepareData = (body: any): any => {
    // Omitir campos que no deberían actualizarse
    const { id, createdAt, updatedAt, ...data } = body;
    return data;
  };

  const postUpdate = (result: any): void => {
    // Hook para ejecutar lógica después de actualizar
    // Puedes sobrescribir esta función en controladores específicos
  };

  // Funciones CRUD
  const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findObject = prepareFindObject(req.query);
      const items = await (prisma as any)[model].findMany(findObject);
      const cleanedItems = items.map(cleanObjectBeforeSend);

      sendResponse(res, {
        success: true,
        data: cleanedItems,
        message: getEntityMessages().listedAll,
      });
    } catch (error) {
      next(error);
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
      const data = prepareData(req.body);
      const newItem = await (prisma as any)[model].create({
        data,
        include: defaultInclude,
      });

      sendResponse(
        res,
        {
          success: true,
          data: cleanObjectBeforeSend(newItem),
          message: getEntityMessages().created,
        },
        201
      );
    } catch (error) {
      next(error);
    }
  };

  const update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = prepareData(req.body);

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

      const updatedItem = await (prisma as any)[model].update({
        where: { id: Number(id) },
        data,
        include: defaultInclude,
      });

      postUpdate(updatedItem);

      sendResponse(res, {
        success: true,
        data: cleanObjectBeforeSend(updatedItem),
        message: getEntityMessages().updated,
      });
    } catch (error) {
      next(error);
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

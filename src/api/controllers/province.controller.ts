import { NextFunction, Request, Response } from "express";

import prisma from "../../infrastructure/database/database";
import { createBaseController } from "./base/base.controller";
import { EntityType } from "../../domain/estities/entity.enum";

const provinceController = createBaseController(EntityType.PROVINCE, {
  searchFields: ["name", "code"],
  excludedFields: ["createdAt", "updatedAt"],
  customSort: { field: "name", order: "asc" },
});

const createProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { stateId } = req.body;

    const state = await prisma.state.findUnique({
      where: { id: Number(stateId) },
    });

    if (!state) {
      res.status(400).json({
        success: false,
        message: "El estado especificado no existe",
      });
      return;
    }

    return provinceController.create(req, res, next);
  } catch (error) {
    next(error);
  }
};

const {
  list: listProvinces,
  get: getProvince,
  update: updateProvince,
  remove: removeProvince,
} = provinceController;

export {
  createProvince,
  listProvinces,
  getProvince,
  updateProvince,
  removeProvince,
};

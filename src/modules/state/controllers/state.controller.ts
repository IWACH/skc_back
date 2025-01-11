import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/database";
import { createBaseController } from "../../base/baseController";
import { EntityType } from "../../../models/entity.enum";

const stateController = createBaseController(EntityType.STATE, {
  searchFields: ["name", "code"],
  excludedFields: ["createdAt", "updatedAt"],
  customSort: { field: "name", order: "asc" },
});

const createState = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { countryId } = req.body;

    const country = await prisma.country.findUnique({
      where: { id: Number(countryId) },
    });

    if (!country) {
      res.status(400).json({
        success: false,
        message: "El país especificado no existe",
      });
      return;
    }

    return stateController.create(req, res, next);
  } catch (error) {
    next(error);
  }
};

const {
  list: listStates,
  get: getState,
  update: updateState,
  remove: removeState,
} = stateController;

export { createState, listStates, getState, updateState, removeState };

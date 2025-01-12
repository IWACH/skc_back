import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/database";
import { createBaseController } from "../../base/baseController";
import { EntityType } from "../../../models/entity.enum";

const districtController = createBaseController(EntityType.DISTRICT, {
  searchFields: ["name", "code"],
  excludedFields: ["createdAt", "updatedAt"],
  customSort: { field: "name", order: "asc" },
});

const createDistrict = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { provinceId } = req.body;

    const province = await prisma.province.findUnique({
      where: { id: Number(provinceId) },
    });

    if (!province) {
      res.status(400).json({
        success: false,
        message: "La provincia especificada no existe",
      });
      return;
    }

    return districtController.create(req, res, next);
  } catch (error) {
    next(error);
  }
};

const {
  list: listDistricts,
  get: getDistrict,
  update: updateDistrict,
  remove: removeDistrict,
} = districtController;

export {
  createDistrict,
  listDistricts,
  getDistrict,
  updateDistrict,
  removeDistrict,
};

import { Router } from "express";
import PositionController from "../controllers/Position.controller.js";
import { isOrganized, isAuth } from "../util/util.js";

const positionRouter = Router();

positionRouter.route("/create").post(isAuth, isOrganized, PositionController.createPosition);
positionRouter.route("/").get(isAuth, isOrganized, PositionController.getPositionsByOrganization);
positionRouter.route("/:id").get(isAuth, isOrganized, PositionController.getPositionById);
export default positionRouter;

import { Router } from "express";
import { upload } from "../middleware/upload.js";
import OrganizationController from "../controllers/Organization.controller.js";

const organizationRouter = Router();

organizationRouter.route("/register-org").post(upload.single("logo"), OrganizationController.createOrganization);
organizationRouter.route("/login-org").post(OrganizationController.loginOrganization);

export default organizationRouter;

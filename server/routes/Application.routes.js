import { Router } from "express";
import ApplicationController from "../controllers/Application.controller.js";
import { isAuth, isDeveloperOrOrganized, isDeveloper } from "../util/util.js";
import { upload } from "../middleware/upload.js";

const applicationRouter = Router();

applicationRouter
  .route("/")
  .post(
    isAuth,
    isDeveloper,
    upload.fields([{ name: "cv" }, { name: "coverLetter" }]),
    ApplicationController.createApplication
  );
applicationRouter
  .route("/:id")
  .get(
    isAuth,
    isDeveloperOrOrganized,
    ApplicationController.getApplicationById
  );
applicationRouter
  .route("/")
  .get(isAuth, isDeveloperOrOrganized, ApplicationController.getApplications);

export default applicationRouter;

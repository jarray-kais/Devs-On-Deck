import { Router } from "express";
import UserControler from "../controllers/User.controller.js";
import { upload } from "../middleware/upload.js";


const userRouter = Router();

userRouter.route("/register-dev").post(upload.single("image"),UserControler.registerDeveloper );
userRouter.route("/login-dev").post(UserControler.loginDeveloper);

export default userRouter;
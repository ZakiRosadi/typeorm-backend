import UserControllers from "../controllers/UserControllers";
import * as express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const userRouter = express.Router();

userRouter.post("/register", UserControllers.register);
userRouter.post("/login", UserControllers.login);
userRouter.get("/register", UserControllers.find);

export default userRouter
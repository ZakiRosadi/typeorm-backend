import * as express from "express";
import PemiluControllers from "../controllers/PemiluControllers";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const PemiluRouter = express.Router();
PemiluRouter.get("/pemilu", AuthMiddlewares.authentication, PemiluControllers.findall);

export default PemiluRouter;

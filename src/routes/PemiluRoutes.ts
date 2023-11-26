import * as express from "express";
import PemiluControllers from "../controllers/PemiluControllers";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import uploadFile from "../middlewares/Multer";

const PemiluRouter = express.Router();
PemiluRouter.get("/pemilu", AuthMiddlewares.authentication, PemiluControllers.findall);
PemiluRouter.post("/pemilu", AuthMiddlewares.authentication, uploadFile('image'), PemiluControllers.create);

export default PemiluRouter;

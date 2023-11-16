import * as express from "express";
import PemiluControllers from "../controllers/PemiluControllers";

const PemiluRouter = express.Router();
PemiluRouter.get("/pemilu", PemiluControllers.findall);

export default PemiluRouter;

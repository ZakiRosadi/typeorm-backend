import * as express from "express";
import PaslonControllers from "../controllers/PaslonControllers";

const paslonRouter = express.Router();
paslonRouter.get("/paslon", PaslonControllers.find);
paslonRouter.post("/paslon", PaslonControllers.create);

export default paslonRouter;

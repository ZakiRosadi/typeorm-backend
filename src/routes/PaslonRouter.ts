import * as express from "express";
import PaslonControllers from "../controllers/PaslonControllers";
import uploadFile from "../middlewares/Multer";

const paslonRouter = express.Router();
paslonRouter.get("/paslon", PaslonControllers.find);
paslonRouter.get("/paslon/:id", PaslonControllers.findone)
paslonRouter.post("/paslon", uploadFile("image"), PaslonControllers.create);
paslonRouter.patch("/paslon/:id", uploadFile("image"), PaslonControllers.update);
paslonRouter.delete("/paslon/:id", PaslonControllers.delete);

export default paslonRouter;

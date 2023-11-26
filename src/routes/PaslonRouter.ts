import * as express from "express";
import PaslonControllers from "../controllers/PaslonControllers";
import uploadFile from "../middlewares/Multer";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const paslonRouter = express.Router();
// paslonRouter.get("/paslon", PaslonControllers.find);
// paslonRouter.get("/paslon/:id", PaslonControllers.findone)
// paslonRouter.post("/paslon", uploadFile("image"), PaslonControllers.create);
// paslonRouter.patch("/paslon/:id", uploadFile("image"), PaslonControllers.update);
// paslonRouter.delete("/paslon/:id", PaslonControllers.delete);

paslonRouter.get("/paslon", AuthMiddlewares.authentication, PaslonControllers.find);
paslonRouter.get("/paslon/:id", AuthMiddlewares.authentication, PaslonControllers.findone)
paslonRouter.post("/paslon", AuthMiddlewares.authentication, uploadFile("image"), PaslonControllers.create);
paslonRouter.patch("/paslon/:id", AuthMiddlewares.authentication, uploadFile("image"), PaslonControllers.update);
paslonRouter.delete("/paslon/:id", AuthMiddlewares.authentication, PaslonControllers.delete);

export default paslonRouter;

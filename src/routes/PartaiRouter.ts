import * as express from "express"
import PartaiControllers from "../controllers/PartaiContollers"
import uploadFile from "../middlewares/Multer";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const PartaiRouter = express.Router();
PartaiRouter.get("/partai", AuthMiddlewares.authentication, PartaiControllers.findall);
PartaiRouter.get("/partai/:id", AuthMiddlewares.authentication, PartaiControllers.findone);
PartaiRouter.post("/partai", AuthMiddlewares.authentication, uploadFile('image'), PartaiControllers.create)
PartaiRouter.patch("/partai/:id", AuthMiddlewares.authentication, uploadFile('image'), PartaiControllers.update)
PartaiRouter.delete("/partai/:id", AuthMiddlewares.authentication, PartaiControllers.delete)



export default PartaiRouter
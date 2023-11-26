import * as express from "express"
import PartaiControllers from "../controllers/PartaiContollers"
import uploadFile from "../middlewares/Multer";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const PartaiRouter = express.Router();
// PartaiRouter.get("/partai", PartaiControllers.findall);
// PartaiRouter.get("/partai/:id", PartaiControllers.findone);
// PartaiRouter.post("/partai", uploadFile('image'), PartaiControllers.create)
// PartaiRouter.patch("/partai/:id", uploadFile('image'), PartaiControllers.update)
// PartaiRouter.delete("/partai/:id", PartaiControllers.delete)

PartaiRouter.get("/partai", AuthMiddlewares.authentication, PartaiControllers.findall);
PartaiRouter.get("/partai/:id", AuthMiddlewares.authentication, PartaiControllers.findone);
PartaiRouter.post("/partai", AuthMiddlewares.authentication, uploadFile('image'), PartaiControllers.create)
PartaiRouter.patch("/partai/:id", AuthMiddlewares.authentication, uploadFile('image'), PartaiControllers.update)
PartaiRouter.delete("/partai/:id", AuthMiddlewares.authentication, PartaiControllers.delete)



export default PartaiRouter
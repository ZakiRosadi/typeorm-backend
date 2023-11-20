import * as express from "express"
import PartaiControllers from "../controllers/PartaiContollers"
import uploadFile from "../middlewares/Multer";


const PartaiRouter = express.Router();
PartaiRouter.get("/partai", PartaiControllers.findall);
PartaiRouter.get("/partai/:id", PartaiControllers.findone);
PartaiRouter.post("/partai", uploadFile('image'), PartaiControllers.create)
PartaiRouter.patch("/partai/:id", uploadFile('image'), PartaiControllers.update)
PartaiRouter.delete("/partai/:id", PartaiControllers.delete)



export default PartaiRouter
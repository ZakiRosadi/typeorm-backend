import VoterControllers from "../controllers/VoterControllers";
import * as express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const voterRouter = express.Router();

voterRouter.get("/voter", AuthMiddlewares.authentication, VoterControllers.find);
voterRouter.get("/voter/:id", AuthMiddlewares.authentication, VoterControllers.findone);
voterRouter.post("/voter", AuthMiddlewares.authentication, VoterControllers.create);

export default voterRouter
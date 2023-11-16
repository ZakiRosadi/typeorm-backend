import PemiluServices from "../services/PemiluServices";
import { Request, Response } from "express";

export default new (class PemiluControllers {
  findall(req: Request, res: Response) {
    PemiluServices.findall(req, res);
  }
})();

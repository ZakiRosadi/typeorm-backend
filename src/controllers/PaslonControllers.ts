import PaslonService from "../services/PaslonService";
import { Request, Response } from "express";

export default new (class PaslonControllers {
  static create(arg0: string, create: any) {
    throw new Error("Method not implemented.");
  }
  static find(arg0: string, find: any) {
    throw new Error("Method not implemented.");
  }
  create(req: Request, res: Response) {
    PaslonService.create(req, res);
  }

  find(req: Request, res: Response) {
    PaslonService.findall(req, res);
  }

  findone(req: Request, res: Response) {
    PaslonService.findone(req, res)
  }

  update(req: Request, res: Response) {
    PaslonService.update(req, res)
  }
  delete(req: Request, res: Response) {
    PaslonService.delete(req, res)
  }
})();

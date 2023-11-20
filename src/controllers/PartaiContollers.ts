import PartaiService from "../services/PartaiService";
import { Request, Response } from "express";

export default new class PartaiControllers {

    findall(req: Request, res: Response) {
        PartaiService.findall(req, res);
    }

    findone(req: Request, res: Response) {
        PartaiService.findone(req, res);
    }

    create(req: Request, res: Response) {
        PartaiService.create(req, res);
    }

    update(req: Request, res: Response) {
        PartaiService.update(req, res)
    }

    delete(req: Request, res: Response) {
        PartaiService.delete(req, res)
    }

}
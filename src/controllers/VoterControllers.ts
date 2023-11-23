import VoterService from "../services/VoterService";
import { Request, Response } from "express";

export default new class VoterControllers {
    find(req: Request, res: Response) {
        VoterService.findAll(req, res);
    }

    findone(req: Request, res: Response) {
        VoterService.findOne(req, res);
    }

    create(req: Request, res: Response) {
        VoterService.create(req, res);
    }
}
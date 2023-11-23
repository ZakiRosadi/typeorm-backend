import UserService from "../services/UserService";
import { Request, Response } from "express";

export default new class UserControllers {
    register(req: Request, res: Response) {
        UserService.register(req, res);
    }

    find(req: Request, res: Response) {
        UserService.findAll(req, res);
    }

    login(req: Request, res: Response) {
        UserService.login(req, res)
    }
}
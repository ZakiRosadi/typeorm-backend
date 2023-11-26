import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default new class AuthMiddlewares {
    authentication(req: Request, res: Response, next: NextFunction): Response {
        try {
            const authorization = req.headers.authorization;

            if (!authorization || !authorization.startsWith("Bearear ")) {
                return res.status(404).json({ message: "token not found" })
            }

            const tokenSplit = authorization.split(" ")[1];

            try {
                const loginsession = jwt.verify(tokenSplit, "TOKEN");
                res.locals.loginsession = loginsession;
                next()
            } catch (error) {
                console.log(error)
                return res.status(404).json({ message: "invalid token" })
            }
        } catch (error) {
            return res.status(500).json({ message: "internal server error" })
        }
    }


    decodeWithoutBarier(reqHeader: string): any {
        const dataWithoutBarier = reqHeader.split(" ")[1];
        const decodeJWT = jwt.decode(dataWithoutBarier);
        return decodeJWT;
    }
}
import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class UserService {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            console.log({ message: "register data", data });

            const responseData: number = await this.userRepository.count({ where: { username: data.username } })
            if (responseData === 2) {
                return res.status(404).json({ message: "username is already exist" })
            }

            const bcryptPassword = await bcrypt.hash(data.password, 10)

            const User = this.userRepository.create({
                name: data.name,
                address: data.address,
                gender: data.gender,
                username: data.username,
                password: bcryptPassword
            })

            console.log(User);

            const insertData = await this.userRepository.save(User)
            return res.status(200).json({ message: "successfully insert new data", insertData: insertData })
        } catch (error) {
            return res.status(500).json({ message: "internal server error" })
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const responseData = await this.userRepository.find()
            return res.status(200).json({ message: "sucessfully get data", propertyData: responseData })
        } catch (error) {
            return res.status(404).json({ message: "there is a trouble while running" })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            console.log(data);

            const responseData = await this.userRepository.findOne({ where: { username: data.username } })
            if (responseData === undefined) {
                return res.status(404).json({ message: "username is wrong" })
            }
            const checkPassword = await bcrypt.compare(data.password, responseData.password);
            if (checkPassword === false) {
                return res.status(404).json({ message: "password is wrong" })
            }

            const user = await this.userRepository.create({
                id: responseData.id,
                username: responseData.username

            })

            const getToken = await jwt.sign({ user }, "TOKEN", { expiresIn: "1h" });
            console.log(getToken);
            return res.status(200).json({ message: "successfully login", token: getToken })

        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "something is wrong with login" })
        }
    }
}
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Voter } from "../entities/Voter";
import { User } from "../entities/User";
import { Paslon } from "../entities/Paslon";


export default new class VoterService {
    private readonly voterRepository: Repository<Voter> = AppDataSource.getRepository(Voter);
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);
    private readonly paslonRepository: Repository<Paslon> = AppDataSource.getRepository(Paslon);
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const responseData = await this.voterRepository.find({
                relations: ["user", "paslon"]
            });

            const mapData = responseData.map((data) => ({
                id: data.id,
                name: data.user.name,
                address: data.user.address,
                gender: data.user.gender,
                paslon: data.paslon.namaPaslon
            }))
            return res.status(200).json({ message: "sucessfully get data", propertyData: mapData });
        }
        catch (error) {
            return res.status(404).json({ message: "there is a trouble while running" });
        }

    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const responseData = await this.voterRepository.findOneBy({ id });
            return res.status(200).json({ message: "successfully get data", propertyData: responseData });
        } catch (error) {
            return res.status(404).json({ message: "data id is not found" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {


            const userId = res.locals.loginsession.user.id
            const user = await this.userRepository.findOneBy({ id: userId })

            const data = req.body
            const paslon = await this.paslonRepository.findOneBy({ id: data.paslonId })

            // const voting: number = await this.paslonRepository.count({ where: { id : id } })
            // if (voting >= 1) {
            //     return res.status(400).json({ message: "you can't vote more than one paslon" })
            // }

            // const data1 = {
            //     userId: user.id,
            //     paslonId: idPaslon.paslonId
            // }
            const newData = await this.voterRepository.create({
                user: user,
                paslon: paslon
            })


            const insertData = await this.voterRepository.save(newData);
            return res.status(200).json({ message: "successfully insert new data", data: insertData, });

            // const newData = new Voter();
            // newData.userId = jwtDecode.id
            // newData.paslonId = data.paslonId
            // const insertData = await this.voterRepository.save(newData);     
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "failed to insert data" });
        }

    }
}
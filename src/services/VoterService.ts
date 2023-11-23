import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Voter } from "../entities/Voter";
import cloudinary from "../middlewares/ImageMiddlewares";
import VoterUtil from "../utils/VoterUtil";




export default new class VoterService {
    private readonly voterRepository: Repository<Voter> =
        AppDataSource.getRepository(Voter);
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const responseData = await this.voterRepository.find();
            return res.status(200).json({ message: "sucessfully get data", propertyData: responseData });
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
            const data = req.body;

            console.log(req.body);

            // const { error } = VoterUtil.validate(data);
            // if (error) return res.status(404).json(error.message);


            const objectData = this.voterRepository.create({
                name: data.name,
                address: data.address,
                gender: data.gender,
                electedPaslon: data.electedPaslon
            });

            console.log(objectData);


            const insertData = await this.voterRepository.save(objectData);

            return res.status(200).json({ message: "successfully insert new data", insertData });
        } catch (error) {
            return res.status(404).json({ message: "failed to insert data" });
        }

    }
}
import { Repository } from "typeorm";
import { Pemilu } from "../entities/Pemilu";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import cloudinary from "../middlewares/ImageMiddlewares";
import { User } from "../entities/User";



export default new (class PemiluServices {
  private readonly PemiluRepository: Repository<Pemilu> = AppDataSource.getRepository(Pemilu);
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

  async findall(req: Request, res: Response): Promise<Response> {
    try {
      // const responseData = await this.PemiluRepository.find();
      const responseData = await this.PemiluRepository.find({
        relations: ["user"]
      });

      return res.status(200).json({
        status: 200,
        message: "sucessfully get data",
        propertiData: responseData,
      });
    } catch (err) {
      return res.status(500).json({ Error: "errow while inserting data" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      data.author = res.locals.loginsession.user.username
      data.user = res.locals.loginsession.user.id

      const userId = await this.UserRepository.findOneBy({ id: data.user })

      const cloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "pemilu",
        tags: "article"
      });

      const objectData = await this.PemiluRepository.create({
        title: data.title,
        author: data.author,
        image: cloud.secure_url,
        user: userId
      });

      const insertData = await this.PemiluRepository.save(objectData);
      return res.status(200).json({ message: "sucessfully insert new data", data: insertData });
    } catch (error) {
      console.log(error);

      return res.status(500).json(error.message);
    }
  }
})();

import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Paslon } from "../entities/Paslon";
import paslonSchemaUtil from "../utils/PaslonUtil";

export default new (class PaslonService {
  private readonly privatePaslonService: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.privatePaslonService.find();

      return res.status(200).json({
        message: "successfully get all data",
        propertyData: responseData,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "there is a trouble while running" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = paslonSchemaUtil.validate(data);
      if (error) return res.status(404).json(error.message);

      const objectDatabasePaslon = this.privatePaslonService.create({
        namaPaslon: data.namaPaslon,
        idOrder: data.idOrder,
        visiMisi: data.visiMisi,
        image: data.image,
      });

      const insertData = await this.privatePaslonService.save(
        objectDatabasePaslon
      );
      return res.status(200).json({ message: "successfully insert new data" });
    } catch (error) {
      return res.status(404).json({ message: "failed to insert data" });
    }
  }
})();

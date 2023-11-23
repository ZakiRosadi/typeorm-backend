import { Repository } from "typeorm";
import { Pemilu } from "../entities/Pemilu";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";



export default new (class PemiluServices {
  private readonly PemiluRepository: Repository<Pemilu> =
    AppDataSource.getRepository(Pemilu);

  async findall(req: Request, res: Response): Promise<Response> {
    try {
      const responseData = await this.PemiluRepository.find();

      return res.status(200).json({
        status: 200,
        message: "sucessfully get data",
        propertiData: responseData,
      });
    } catch (err) {
      return res.status(500).json({ Error: "errow while inserting data" });
    }
  }
})();

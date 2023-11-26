import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Paslon } from "../entities/Paslon";
import paslonSchemaUtil from "../utils/PaslonUtil";
import cloudinary from "../middlewares/ImageMiddlewares";
import * as fs from "fs";


export default new class PaslonService {
  private readonly privatePaslonService: Repository<Paslon> = AppDataSource.getRepository(Paslon);

  async findall(req: Request, res: Response): Promise<Response> {
    try {
      // const responseData = await this.privatePaslonService.find();
      const responseData = await this.privatePaslonService.find({
        relations: ["Partai"],
      });

      const paslonList = responseData.map((partai) => {
        return {
          id: partai.id,
          namaPaslon: partai.namaPaslon,
          idOrder: partai.idOrder,
          visiMisi: partai.visiMisi,
          image: partai.image,
          partai: partai.Partai.map((data) => {
            return {
              data: data
            }
          }),
        }
      })

      return res.status(200).json({ message: "successfully get data", propertiData: paslonList });

    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "there is a trouble while running" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      // console.log(data);

      const { error } = paslonSchemaUtil.validate(data);
      if (error) return res.status(404).json(error.message);

      const dataCloud = await cloudinary.uploader.upload(req.file.path)

      const objectDatabasePaslon = await this.privatePaslonService.create({
        namaPaslon: data.namaPaslon,
        idOrder: data.idOrder,
        visiMisi: data.visiMisi,
        image: dataCloud.secure_url,
      });

      await fs.unlinkSync(req.file.path)

      const insertData = await this.privatePaslonService.save(
        objectDatabasePaslon
      );
      return res
        .status(200)
        .json({ message: "successfully insert new data", insertData });
    } catch (error) {
      return res.status(404).json({ message: "failed to insert data" });
    }

  }


  async findone(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);

      const dataFindOne = await this.privatePaslonService.findOneBy({ id })

      if (dataFindOne) {
        return res.status(200).json(dataFindOne);
      } else {
        return res.status(404).json({ message: "failed to get data by id" });


      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id)

      const selectedPaslon = await this.privatePaslonService.findOneBy({ id })

      const data = req.body
      const { error } = paslonSchemaUtil.validate(data)
      console.log(data);


      const image = req.file;
      if (image === undefined) {
        return res.status(404).json({ message: "image not found" });
      }

      const urlArray = selectedPaslon.image.split("/");
      const imageName = urlArray[urlArray.length - 1];
      const publicId = imageName.split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      const newData = await cloudinary.uploader.upload(image.path);

      fs.unlinkSync(image.path);

      selectedPaslon.idOrder = data.idOrder
      selectedPaslon.namaPaslon = data.namaPaslon
      selectedPaslon.visiMisi = data.visiMisi
      selectedPaslon.image = newData.secure_url

      const updateData = await this.privatePaslonService.save(selectedPaslon)
      return res.status(200).json({ message: "successfully update data", updateData })


      // let namaPaslon: string | undefined = data.namaPaslon ?? selectedPaslon.namaPaslon
      // let visiMisi: string | undefined = data.visiMisi ?? selectedPaslon.visiMisi
      // let image: string| undefined
    } catch (error) {
      return res.status(404).json({ message: "failed to update data" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id)
      const dataResponse = await this.privatePaslonService.findOneBy({ id })

      const ulArray = dataResponse.image.split("/");
      const imageName = ulArray[ulArray.length - 1];
      const publicId = imageName.split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      await this.privatePaslonService.delete({ id: id });
      return res.status(202).json({ message: "successfully delete data" });
    } catch (error) {
      return res.status(404).json({ message: "failed to delete data" });
    }
  }
}

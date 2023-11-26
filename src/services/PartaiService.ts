import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Partai } from "../entities/Partai";
import PartaiUtil from "../utils/PartaiUtil";
import cloudinary from "../middlewares/ImageMiddlewares";
import * as fs from "fs"
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink)


export default new class PartaiService {
    private readonly partaiRepository: Repository<Partai> =
        AppDataSource.getRepository(Partai)


    async findall(req: Request, res: Response): Promise<Response> {
        try {
            const dataResponse = await this.partaiRepository.find();
            // const dataResponse = await this.partaiRepository.find({
            //     relations: ["paslon"]
            // });
            if (!dataResponse) {
                return res.status(404).json({ message: "data not found" });
            }
            return res.status(200).json({ message: "sucessfully get data", propertiData: dataResponse });
        } catch (error) {
            return res.status(404).json({ message: error })
        }
    }

    async findone(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const dataResponse = await this.partaiRepository.findOneBy({ id });
            if (!dataResponse) return res.status(404).json({ message: "data not found" });
            return res.status(200).json({ message: "successfully get data", propertiData: dataResponse });
        } catch (error) {
            return res.status(404).json({ message: error })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = PartaiUtil.validate(data);
            if (error) return res.status(404).json(error.message);

            const dataCloud = await cloudinary.uploader.upload(req.file.path)


            const objectData = await this.partaiRepository.create({
                namaPartai: data.namaPartai,
                ketuaUmum: data.ketuaUmum,
                visiMisi: data.visiMisi,
                alamat: data.alamat,
                image: dataCloud.secure_url,
                paslon: data.paslon
            });

            await fs.unlinkSync(req.file.path)

            const insertData = await this.partaiRepository.save(objectData);
            return res.status(200).json({
                message: "successfully insert new data",
                insertData: insertData
            })

        }
        catch (error) {
            console.error("error", error);
            return res.status(404).json({ message: "failed to insert data" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);

            const selectedPartai = await this.partaiRepository.findOneBy({ id: id });

            const data = req.body

            let namaPartai: string | undefined = data.namaPartai ?? selectedPartai.namaPartai
            let ketuaUmum: string | undefined = data.ketuaUmum ?? selectedPartai.ketuaUmum
            let visiMisi: string | undefined = data.visiMisi ?? selectedPartai.visiMisi
            let alamat: string | undefined = data.alamat ?? selectedPartai.alamat
            let image: string | undefined = data.image ?? selectedPartai.image
            let paslon: any | undefined = data.paslon ?? selectedPartai.paslon



            if (req.file) {
                const urlArray = image.split("/");
                const imageName = urlArray[urlArray.length - 1];
                const publicId = imageName.split(".")[0];
                await cloudinary.uploader.destroy(publicId);
                // await cloudinary.uploader.destroy(image).then(result => console.log(result));

                const newData = await cloudinary.uploader.upload(req.file.path);
                image = newData.secure_url;
                await unlinkAsync(req.file.path)
            }


            await this.partaiRepository.update({ id: id }, {
                namaPartai: namaPartai,
                ketuaUmum: ketuaUmum,
                visiMisi: visiMisi,
                alamat: alamat,
                image: image,
                paslon: paslon,
                postedAt: new Date()
            })

            const result = await this.partaiRepository.findOneBy({ id: id });
            return res.status(200).json({ message: "successfully update data", result: result })
        } catch (error) {
            return res.status(404).json({ message: "ini error", result: error })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);
            const dataResponse = await this.partaiRepository.findOneBy({ id });

            const imageArray = dataResponse.image.split("/");
            const imageName = imageArray[imageArray.length - 1];
            const publicId = imageName.split(".")[0];
            await cloudinary.uploader.destroy(publicId);

            await this.partaiRepository.delete({ id: id });
            return res.status(200).json({ message: " successfully delete data" });
        } catch (error) {
            return res.status(404).json({ message: "error while deleting data" });
        }
    }
}

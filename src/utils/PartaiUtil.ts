import * as joi from "joi";

const PartaiUtil = joi.object({
    namaPartai: joi.string().max(50).required(),
    ketuaUmum: joi.string().min(3).max(50).required(),
    visiMisi: joi.string().min(5).max(50).required(),
    alamat: joi.string().min(5).max(50).required(),
    paslon: joi.number().required()
});

export default PartaiUtil;
